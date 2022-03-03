
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/main/AboutMe.svelte generated by Svelte v3.46.4 */

    const file$7 = "src/main/AboutMe.svelte";

    function create_fragment$7(ctx) {
    	let article;
    	let h1;
    	let t1;
    	let div;
    	let span;

    	const block = {
    		c: function create() {
    			article = element("article");
    			h1 = element("h1");
    			h1.textContent = "Acerca de mi";
    			t1 = space();
    			div = element("div");
    			span = element("span");
    			span.textContent = "Me gusta aprender y proponerme retos. Me considero entuciasta y constante.\n      Me gusta la lectura y la buena música. Sé trabajar en equipo, escuchar y\n      acepto críticas. Responsable con el trabajo y ante la vida.";
    			add_location(h1, file$7, 1, 2, 12);
    			attr_dev(span, "class", "font-light italic");
    			add_location(span, file$7, 3, 4, 59);
    			attr_dev(div, "class", "grid svelte-qt3mee");
    			add_location(div, file$7, 2, 2, 36);
    			attr_dev(article, "class", "svelte-qt3mee");
    			add_location(article, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h1);
    			append_dev(article, t1);
    			append_dev(article, div);
    			append_dev(div, span);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AboutMe', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AboutMe> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class AboutMe extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AboutMe",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/main/Jobs.svelte generated by Svelte v3.46.4 */

    const file$6 = "src/main/Jobs.svelte";

    function create_fragment$6(ctx) {
    	let article;
    	let h1;
    	let t1;
    	let div0;
    	let span0;
    	let t3;
    	let p0;
    	let span1;
    	let t5;
    	let span2;
    	let t7;
    	let p1;
    	let span3;
    	let t9;
    	let span4;
    	let t11;
    	let div1;
    	let span5;
    	let t13;
    	let p2;
    	let span6;
    	let t15;
    	let span7;
    	let t17;
    	let p3;
    	let span8;
    	let t19;
    	let span9;
    	let t21;
    	let div2;
    	let span10;
    	let t23;
    	let p4;
    	let span11;
    	let t25;
    	let span12;
    	let t27;
    	let p5;
    	let span13;
    	let t29;
    	let span14;
    	let t31;
    	let div3;
    	let span15;
    	let t33;
    	let p6;
    	let span16;
    	let t35;
    	let span17;
    	let t37;
    	let p7;
    	let span18;
    	let t39;
    	let span19;

    	const block = {
    		c: function create() {
    			article = element("article");
    			h1 = element("h1");
    			h1.textContent = "Experiencia Laboral";
    			t1 = space();
    			div0 = element("div");
    			span0 = element("span");
    			span0.textContent = "ACUBAMOS";
    			t3 = space();
    			p0 = element("p");
    			span1 = element("span");
    			span1.textContent = "Cargo:";
    			t5 = space();
    			span2 = element("span");
    			span2.textContent = "Programador";
    			t7 = space();
    			p1 = element("p");
    			span3 = element("span");
    			span3.textContent = "Tareas:";
    			t9 = space();
    			span4 = element("span");
    			span4.textContent = "Diseñar con Material-UI y Materializecss web. Programar aplicaciones\n        dirigidas al comercio electrónico. Creando APIs y Microservicios con\n        Nodejs. Interfaces de usuarios mediante React y Redux. Como base de\n        datos MySQL, Postgresql y Redis.";
    			t11 = space();
    			div1 = element("div");
    			span5 = element("span");
    			span5.textContent = "EMCOMED";
    			t13 = space();
    			p2 = element("p");
    			span6 = element("span");
    			span6.textContent = "Cargo:";
    			t15 = space();
    			span7 = element("span");
    			span7.textContent = "Administrador de Redes";
    			t17 = space();
    			p3 = element("p");
    			span8 = element("span");
    			span8.textContent = "Tareas:";
    			t19 = space();
    			span9 = element("span");
    			span9.textContent = "Administración de servidores Linux y Windows. Trabajar con\n        virtualización de servicios mediante VMware. Configuración de\n        corta-fuegos. Trabajo en sistema de noticias utilizando scraping con\n        Symfony3 y MYSQL para la manipulación de datos. Trabaje en equipo para\n        un sistema de ventas, donde se pueden observar datos y conocer la\n        ubicación y el estado de un producto, todo en tiempo real, utilizando\n        NodeJs como microservicio, React como frontend y MSSQL y MySQL como bd.\n        También en equipo un sistema en Python ,SQLite y MSSQL que para la\n        distribución de medicamentos para las instituciones de salud pública.";
    			t21 = space();
    			div2 = element("div");
    			span10 = element("span");
    			span10.textContent = "PRINCITY";
    			t23 = space();
    			p4 = element("p");
    			span11 = element("span");
    			span11.textContent = "Cargo:";
    			t25 = space();
    			span12 = element("span");
    			span12.textContent = "Diseñador Gráfico";
    			t27 = space();
    			p5 = element("p");
    			span13 = element("span");
    			span13.textContent = "Tareas:";
    			t29 = space();
    			span14 = element("span");
    			span14.textContent = "Diseñar tarjetas de presentación, de bodas y fiestas. Además de postales\n        y portadas. Diseño y maquetación web con herramientas como Photoshop y\n        CorelDraw.";
    			t31 = space();
    			div3 = element("div");
    			span15 = element("span");
    			span15.textContent = "COPEXTEL";
    			t33 = space();
    			p6 = element("p");
    			span16 = element("span");
    			span16.textContent = "Cargo:";
    			t35 = space();
    			span17 = element("span");
    			span17.textContent = "Responsable de Seguridad Informática";
    			t37 = space();
    			p7 = element("p");
    			span18 = element("span");
    			span18.textContent = "Tareas:";
    			t39 = space();
    			span19 = element("span");
    			span19.textContent = "Supervisión y mantenimiento de la seguridad en la red. Trabajo con\n        herramientas como WireShar, Nmap, OSSIN y otros sistemas de scanner.\n        Trabajo con servidores Linux y Windons. Configuracion de corta-fuegos.\n        Evitar brechas de seguridad, posibles ataques y caídas de sistemas.\n        Desarrollo de aplicaciones para el mejoramiento de sistemas de seguridad\n        con PHP.";
    			add_location(h1, file$6, 1, 2, 12);
    			attr_dev(span0, "class", "font-bold uppercase");
    			add_location(span0, file$6, 3, 4, 66);
    			attr_dev(span1, "class", "font-bold");
    			add_location(span1, file$6, 5, 6, 130);
    			attr_dev(span2, "class", "italic font-light");
    			add_location(span2, file$6, 6, 6, 174);
    			add_location(p0, file$6, 4, 4, 120);
    			attr_dev(span3, "class", "font-bold");
    			add_location(span3, file$6, 9, 6, 249);
    			attr_dev(span4, "class", "italic font-light");
    			add_location(span4, file$6, 10, 6, 294);
    			add_location(p1, file$6, 8, 4, 239);
    			attr_dev(div0, "class", "grid svelte-qt3mee");
    			add_location(div0, file$6, 2, 2, 43);
    			attr_dev(span5, "class", "font-bold uppercase");
    			add_location(span5, file$6, 19, 4, 655);
    			attr_dev(span6, "class", "font-bold");
    			add_location(span6, file$6, 21, 6, 718);
    			attr_dev(span7, "class", "italic font-light");
    			add_location(span7, file$6, 22, 6, 762);
    			add_location(p2, file$6, 20, 4, 708);
    			attr_dev(span8, "class", "font-bold");
    			add_location(span8, file$6, 25, 6, 848);
    			attr_dev(span9, "class", "italic font-light");
    			add_location(span9, file$6, 26, 6, 893);
    			add_location(p3, file$6, 24, 4, 838);
    			attr_dev(div1, "class", "grid svelte-qt3mee");
    			add_location(div1, file$6, 18, 2, 632);
    			attr_dev(span10, "class", "font-bold uppercase");
    			add_location(span10, file$6, 40, 4, 1661);
    			attr_dev(span11, "class", "font-bold");
    			add_location(span11, file$6, 42, 6, 1725);
    			attr_dev(span12, "class", "italic font-light");
    			add_location(span12, file$6, 43, 6, 1769);
    			add_location(p4, file$6, 41, 4, 1715);
    			attr_dev(span13, "class", "font-bold");
    			add_location(span13, file$6, 46, 6, 1850);
    			attr_dev(span14, "class", "italic font-light");
    			add_location(span14, file$6, 47, 6, 1895);
    			add_location(p5, file$6, 45, 4, 1840);
    			attr_dev(div2, "class", "grid svelte-qt3mee");
    			add_location(div2, file$6, 39, 2, 1638);
    			attr_dev(span15, "class", "font-bold uppercase");
    			add_location(span15, file$6, 55, 4, 2164);
    			attr_dev(span16, "class", "font-bold");
    			add_location(span16, file$6, 57, 6, 2228);
    			attr_dev(span17, "class", "italic font-light");
    			add_location(span17, file$6, 58, 6, 2272);
    			add_location(p6, file$6, 56, 4, 2218);
    			attr_dev(span18, "class", "font-bold");
    			add_location(span18, file$6, 63, 6, 2387);
    			attr_dev(span19, "class", "italic font-light");
    			add_location(span19, file$6, 64, 6, 2432);
    			add_location(p7, file$6, 62, 4, 2377);
    			attr_dev(div3, "class", "grid svelte-qt3mee");
    			add_location(div3, file$6, 54, 2, 2141);
    			attr_dev(article, "class", "svelte-qt3mee");
    			add_location(article, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h1);
    			append_dev(article, t1);
    			append_dev(article, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t3);
    			append_dev(div0, p0);
    			append_dev(p0, span1);
    			append_dev(p0, t5);
    			append_dev(p0, span2);
    			append_dev(div0, t7);
    			append_dev(div0, p1);
    			append_dev(p1, span3);
    			append_dev(p1, t9);
    			append_dev(p1, span4);
    			append_dev(article, t11);
    			append_dev(article, div1);
    			append_dev(div1, span5);
    			append_dev(div1, t13);
    			append_dev(div1, p2);
    			append_dev(p2, span6);
    			append_dev(p2, t15);
    			append_dev(p2, span7);
    			append_dev(div1, t17);
    			append_dev(div1, p3);
    			append_dev(p3, span8);
    			append_dev(p3, t19);
    			append_dev(p3, span9);
    			append_dev(article, t21);
    			append_dev(article, div2);
    			append_dev(div2, span10);
    			append_dev(div2, t23);
    			append_dev(div2, p4);
    			append_dev(p4, span11);
    			append_dev(p4, t25);
    			append_dev(p4, span12);
    			append_dev(div2, t27);
    			append_dev(div2, p5);
    			append_dev(p5, span13);
    			append_dev(p5, t29);
    			append_dev(p5, span14);
    			append_dev(article, t31);
    			append_dev(article, div3);
    			append_dev(div3, span15);
    			append_dev(div3, t33);
    			append_dev(div3, p6);
    			append_dev(p6, span16);
    			append_dev(p6, t35);
    			append_dev(p6, span17);
    			append_dev(div3, t37);
    			append_dev(div3, p7);
    			append_dev(p7, span18);
    			append_dev(p7, t39);
    			append_dev(p7, span19);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Jobs', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Jobs> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Jobs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Jobs",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/main/Preparation.svelte generated by Svelte v3.46.4 */

    const file$5 = "src/main/Preparation.svelte";

    function create_fragment$5(ctx) {
    	let article;
    	let h10;
    	let t1;
    	let div0;
    	let ul0;
    	let li0;
    	let t3;
    	let li1;
    	let t5;
    	let li2;
    	let t7;
    	let li3;
    	let t9;
    	let li4;
    	let t11;
    	let li5;
    	let t13;
    	let h11;
    	let t15;
    	let div1;
    	let ul1;
    	let li6;
    	let t17;
    	let li7;
    	let t19;
    	let li8;
    	let t21;
    	let li9;
    	let t23;
    	let li10;
    	let t25;
    	let li11;
    	let t27;
    	let li12;

    	const block = {
    		c: function create() {
    			article = element("article");
    			h10 = element("h1");
    			h10.textContent = "Formaciones Adicionales";
    			t1 = space();
    			div0 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			li0.textContent = "Curso de Programación Avanzado en Bash";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "Curso de Seguridad Informática I, II, III";
    			t5 = space();
    			li2 = element("li");
    			li2.textContent = "Administración de Servidores Linux";
    			t7 = space();
    			li3 = element("li");
    			li3.textContent = "Curso de Diseño Gráfico en Photoshop y CorelDraw";
    			t9 = space();
    			li4 = element("li");
    			li4.textContent = "Curso de Symfony2";
    			t11 = space();
    			li5 = element("li");
    			li5.textContent = "Sigestic`19";
    			t13 = space();
    			h11 = element("h1");
    			h11.textContent = "Trabajos realizados";
    			t15 = space();
    			div1 = element("div");
    			ul1 = element("ul");
    			li6 = element("li");
    			li6.textContent = "kefacil.com(e-commerce)";
    			t17 = space();
    			li7 = element("li");
    			li7.textContent = "SisReclam(sistema para las reclamación de productos).";
    			t19 = space();
    			li8 = element("li");
    			li8.textContent = "Informes(herramienta de informes logísticos y de control de cobros y\n        pagos).";
    			t21 = space();
    			li9 = element("li");
    			li9.textContent = "Herramienta para organización de la documentación legal.";
    			t23 = space();
    			li10 = element("li");
    			li10.textContent = "Herramienta para Comite de Caja.";
    			t25 = space();
    			li11 = element("li");
    			li11.textContent = "Sistema de pedidos de medicamentos.";
    			t27 = space();
    			li12 = element("li");
    			li12.textContent = "camongs.es";
    			add_location(h10, file$5, 1, 2, 12);
    			add_location(li0, file$5, 4, 6, 99);
    			add_location(li1, file$5, 5, 6, 153);
    			add_location(li2, file$5, 6, 6, 210);
    			add_location(li3, file$5, 7, 6, 260);
    			add_location(li4, file$5, 8, 6, 324);
    			add_location(li5, file$5, 9, 6, 357);
    			add_location(ul0, file$5, 3, 4, 88);
    			attr_dev(div0, "class", "grid font-light italic svelte-9gn9ze");
    			add_location(div0, file$5, 2, 2, 47);
    			add_location(h11, file$5, 13, 2, 400);
    			add_location(li6, file$5, 16, 6, 483);
    			add_location(li7, file$5, 17, 6, 522);
    			add_location(li8, file$5, 18, 6, 591);
    			add_location(li9, file$5, 22, 6, 707);
    			add_location(li10, file$5, 23, 6, 779);
    			add_location(li11, file$5, 24, 6, 827);
    			add_location(li12, file$5, 25, 6, 878);
    			add_location(ul1, file$5, 15, 4, 472);
    			attr_dev(div1, "class", "grid font-light italic svelte-9gn9ze");
    			add_location(div1, file$5, 14, 2, 431);
    			attr_dev(article, "class", "svelte-9gn9ze");
    			add_location(article, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h10);
    			append_dev(article, t1);
    			append_dev(article, div0);
    			append_dev(div0, ul0);
    			append_dev(ul0, li0);
    			append_dev(ul0, t3);
    			append_dev(ul0, li1);
    			append_dev(ul0, t5);
    			append_dev(ul0, li2);
    			append_dev(ul0, t7);
    			append_dev(ul0, li3);
    			append_dev(ul0, t9);
    			append_dev(ul0, li4);
    			append_dev(ul0, t11);
    			append_dev(ul0, li5);
    			append_dev(article, t13);
    			append_dev(article, h11);
    			append_dev(article, t15);
    			append_dev(article, div1);
    			append_dev(div1, ul1);
    			append_dev(ul1, li6);
    			append_dev(ul1, t17);
    			append_dev(ul1, li7);
    			append_dev(ul1, t19);
    			append_dev(ul1, li8);
    			append_dev(ul1, t21);
    			append_dev(ul1, li9);
    			append_dev(ul1, t23);
    			append_dev(ul1, li10);
    			append_dev(ul1, t25);
    			append_dev(ul1, li11);
    			append_dev(ul1, t27);
    			append_dev(ul1, li12);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Preparation', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Preparation> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Preparation extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Preparation",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/main/Study.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/main/Study.svelte";

    function create_fragment$4(ctx) {
    	let article;
    	let h1;
    	let t1;
    	let div;
    	let p;
    	let span0;
    	let t3;
    	let ul;
    	let li0;
    	let t4;
    	let span1;
    	let t6;
    	let li1;
    	let t7;
    	let span2;

    	const block = {
    		c: function create() {
    			article = element("article");
    			h1 = element("h1");
    			h1.textContent = "Estudios";
    			t1 = space();
    			div = element("div");
    			p = element("p");
    			span0 = element("span");
    			span0.textContent = "Lic. en Ciencias Informáticas, Inst. Pedagógico Juan A. Marinello,\n        Matanzas, Cuba";
    			t3 = space();
    			ul = element("ul");
    			li0 = element("li");
    			t4 = text("Español: ");
    			span1 = element("span");
    			span1.textContent = "Natal";
    			t6 = space();
    			li1 = element("li");
    			t7 = text("Inglés: ");
    			span2 = element("span");
    			span2.textContent = "Nivel Medio";
    			add_location(h1, file$4, 1, 2, 12);
    			attr_dev(span0, "class", "italic font-light svelte-1n2tbt6");
    			add_location(span0, file$4, 4, 6, 65);
    			add_location(p, file$4, 3, 4, 55);
    			attr_dev(span1, "class", "svelte-1n2tbt6");
    			add_location(span1, file$4, 11, 19, 248);
    			attr_dev(li0, "class", "svelte-1n2tbt6");
    			add_location(li0, file$4, 11, 6, 235);
    			attr_dev(span2, "class", "svelte-1n2tbt6");
    			add_location(span2, file$4, 12, 18, 290);
    			attr_dev(li1, "class", "svelte-1n2tbt6");
    			add_location(li1, file$4, 12, 6, 278);
    			add_location(ul, file$4, 10, 4, 224);
    			attr_dev(div, "class", "grid svelte-1n2tbt6");
    			add_location(div, file$4, 2, 2, 32);
    			attr_dev(article, "class", "svelte-1n2tbt6");
    			add_location(article, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h1);
    			append_dev(article, t1);
    			append_dev(article, div);
    			append_dev(div, p);
    			append_dev(p, span0);
    			append_dev(div, t3);
    			append_dev(div, ul);
    			append_dev(ul, li0);
    			append_dev(li0, t4);
    			append_dev(li0, span1);
    			append_dev(ul, t6);
    			append_dev(ul, li1);
    			append_dev(li1, t7);
    			append_dev(li1, span2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Study', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Study> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Study extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Study",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/main/Main.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/main/Main.svelte";

    function create_fragment$3(ctx) {
    	let main;
    	let aboutme;
    	let t0;
    	let jobs;
    	let t1;
    	let study;
    	let t2;
    	let preparation;
    	let current;
    	aboutme = new AboutMe({ $$inline: true });
    	jobs = new Jobs({ $$inline: true });
    	study = new Study({ $$inline: true });
    	preparation = new Preparation({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(aboutme.$$.fragment);
    			t0 = space();
    			create_component(jobs.$$.fragment);
    			t1 = space();
    			create_component(study.$$.fragment);
    			t2 = space();
    			create_component(preparation.$$.fragment);
    			add_location(main, file$3, 7, 0, 186);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(aboutme, main, null);
    			append_dev(main, t0);
    			mount_component(jobs, main, null);
    			append_dev(main, t1);
    			mount_component(study, main, null);
    			append_dev(main, t2);
    			mount_component(preparation, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(aboutme.$$.fragment, local);
    			transition_in(jobs.$$.fragment, local);
    			transition_in(study.$$.fragment, local);
    			transition_in(preparation.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(aboutme.$$.fragment, local);
    			transition_out(jobs.$$.fragment, local);
    			transition_out(study.$$.fragment, local);
    			transition_out(preparation.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(aboutme);
    			destroy_component(jobs);
    			destroy_component(study);
    			destroy_component(preparation);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Main', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Main> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ AboutMe, Jobs, Preparation, Study });
    	return [];
    }

    class Main extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Main",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Header.svelte generated by Svelte v3.46.4 */

    const file$2 = "src/Header.svelte";

    function create_fragment$2(ctx) {
    	let header;
    	let div2;
    	let div0;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let ul;
    	let li0;
    	let span0;
    	let span1;
    	let t3;
    	let li1;
    	let span2;
    	let span3;
    	let t7;
    	let li2;
    	let span4;
    	let span5;
    	let t10;
    	let li3;
    	let span6;
    	let span7;
    	let a;

    	const block = {
    		c: function create() {
    			header = element("header");
    			div2 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			ul = element("ul");
    			li0 = element("li");
    			span0 = element("span");
    			span0.textContent = "nombre:";
    			span1 = element("span");
    			span1.textContent = "Fidel de Jesus Miranda Gallego";
    			t3 = space();
    			li1 = element("li");
    			span2 = element("span");
    			span2.textContent = "edad:";
    			span3 = element("span");
    			span3.textContent = `${/*edad*/ ctx[1]} año`;
    			t7 = space();
    			li2 = element("li");
    			span4 = element("span");
    			span4.textContent = "móvil:";
    			span5 = element("span");
    			span5.textContent = "(+53) 54756652";
    			t10 = space();
    			li3 = element("li");
    			span6 = element("span");
    			span6.textContent = "email:";
    			span7 = element("span");
    			a = element("a");
    			a.textContent = "fjmgqba@gmail.com";
    			attr_dev(img, "class", "logo svelte-6se4qp");
    			if (!src_url_equal(img.src, img_src_value = /*logo*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*logo*/ ctx[0]);
    			add_location(img, file$2, 9, 6, 239);
    			attr_dev(div0, "class", "py-4 animate__animated animate__fadeIn");
    			add_location(div0, file$2, 8, 4, 180);
    			attr_dev(span0, "class", "titulo__personales svelte-6se4qp");
    			add_location(span0, file$2, 14, 10, 361);
    			attr_dev(span1, "class", "datos__personales svelte-6se4qp");
    			add_location(span1, file$2, 14, 57, 408);
    			add_location(li0, file$2, 13, 8, 346);
    			attr_dev(span2, "class", "titulo__personales svelte-6se4qp");
    			add_location(span2, file$2, 19, 10, 538);
    			attr_dev(span3, "class", "datos__personales svelte-6se4qp");
    			add_location(span3, file$2, 19, 55, 583);
    			add_location(li1, file$2, 18, 8, 523);
    			attr_dev(span4, "class", "titulo__personales svelte-6se4qp");
    			add_location(span4, file$2, 24, 10, 693);
    			attr_dev(span5, "class", "datos__personales svelte-6se4qp");
    			add_location(span5, file$2, 24, 56, 739);
    			add_location(li2, file$2, 23, 8, 678);
    			attr_dev(span6, "class", "titulo__personales svelte-6se4qp");
    			add_location(span6, file$2, 31, 10, 877);
    			attr_dev(a, "href", "mailto:fjmgqba@gmail.com");
    			add_location(a, file$2, 34, 12, 991);
    			attr_dev(span7, "class", "datos__personales svelte-6se4qp");
    			add_location(span7, file$2, 31, 56, 923);
    			add_location(li3, file$2, 30, 8, 862);
    			add_location(ul, file$2, 12, 6, 333);
    			attr_dev(div1, "class", "py-8 text-right");
    			add_location(div1, file$2, 11, 4, 297);
    			attr_dev(div2, "class", "grid grid-cols-2");
    			add_location(div2, file$2, 7, 2, 145);
    			attr_dev(header, "class", "svelte-6se4qp");
    			add_location(header, file$2, 5, 0, 93);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, ul);
    			append_dev(ul, li0);
    			append_dev(li0, span0);
    			append_dev(li0, span1);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(li1, span2);
    			append_dev(li1, span3);
    			append_dev(ul, t7);
    			append_dev(ul, li2);
    			append_dev(li2, span4);
    			append_dev(li2, span5);
    			append_dev(ul, t10);
    			append_dev(ul, li3);
    			append_dev(li3, span6);
    			append_dev(li3, span7);
    			append_dev(span7, a);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let logo = "./logo.png";
    	let edad = new Date().getFullYear() - 1984;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ logo, edad });

    	$$self.$inject_state = $$props => {
    		if ('logo' in $$props) $$invalidate(0, logo = $$props.logo);
    		if ('edad' in $$props) $$invalidate(1, edad = $$props.edad);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [logo, edad];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* node_modules/svelte-material-icons/LightbulbOn.svelte generated by Svelte v3.46.4 */

    const file$1 = "node_modules/svelte-material-icons/LightbulbOn.svelte";

    function create_fragment$1(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z");
    			attr_dev(path, "fill", /*color*/ ctx[2]);
    			add_location(path, file$1, 8, 59, 234);
    			attr_dev(svg, "width", /*width*/ ctx[0]);
    			attr_dev(svg, "height", /*height*/ ctx[1]);
    			attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			add_location(svg, file$1, 8, 0, 175);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*color*/ 4) {
    				attr_dev(path, "fill", /*color*/ ctx[2]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(svg, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 2) {
    				attr_dev(svg, "height", /*height*/ ctx[1]);
    			}

    			if (dirty & /*viewBox*/ 8) {
    				attr_dev(svg, "viewBox", /*viewBox*/ ctx[3]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('LightbulbOn', slots, []);
    	let { size = "1em" } = $$props;
    	let { width = size } = $$props;
    	let { height = size } = $$props;
    	let { color = "currentColor" } = $$props;
    	let { viewBox = "0 0 24 24" } = $$props;
    	const writable_props = ['size', 'width', 'height', 'color', 'viewBox'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<LightbulbOn> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    	};

    	$$self.$capture_state = () => ({ size, width, height, color, viewBox });

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(4, size = $$props.size);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('viewBox' in $$props) $$invalidate(3, viewBox = $$props.viewBox);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, height, color, viewBox, size];
    }

    class LightbulbOn extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			size: 4,
    			width: 0,
    			height: 1,
    			color: 2,
    			viewBox: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LightbulbOn",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get size() {
    		throw new Error("<LightbulbOn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<LightbulbOn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<LightbulbOn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<LightbulbOn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<LightbulbOn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<LightbulbOn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<LightbulbOn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<LightbulbOn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<LightbulbOn>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<LightbulbOn>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */
    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div1;
    	let header;
    	let t0;
    	let div0;
    	let lightbulb;
    	let t1;
    	let main;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	header = new Header({ $$inline: true });
    	lightbulb = new LightbulbOn({ props: { size: "25" }, $$inline: true });
    	main = new Main({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(lightbulb.$$.fragment);
    			t1 = space();
    			create_component(main.$$.fragment);
    			add_location(div0, file, 30, 2, 916);
    			attr_dev(div1, "class", div1_class_value = `${/*texto*/ ctx[0]} ${/*fondo*/ ctx[1]} rounded-lg px-6 py-8 shadow-xl dark:bg-slate-900`);
    			add_location(div1, file, 26, 0, 815);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(header, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(lightbulb, div0, null);
    			append_dev(div1, t1);
    			mount_component(main, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*handleChangeTheme*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*texto, fondo*/ 3 && div1_class_value !== (div1_class_value = `${/*texto*/ ctx[0]} ${/*fondo*/ ctx[1]} rounded-lg px-6 py-8 shadow-xl dark:bg-slate-900`)) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(lightbulb.$$.fragment, local);
    			transition_in(main.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(lightbulb.$$.fragment, local);
    			transition_out(main.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(header);
    			destroy_component(lightbulb);
    			destroy_component(main);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	let { texto, fondo } = JSON.parse(localStorage.getItem("theme")) || {
    		texto: "text-white",
    		fondo: "bg-slate-900"
    	};

    	const handleChangeTheme = () => {
    		if (texto === "text-slate-900" && fondo === "bg-white") {
    			document.documentElement.classList.add("dark");
    			$$invalidate(0, texto = "text-white");
    			$$invalidate(1, fondo = "bg-slate-900");
    			localStorage.setItem("theme", JSON.stringify({ texto, fondo }));
    		} else {
    			document.documentElement.classList.remove("dark");
    			$$invalidate(0, texto = "text-slate-900");
    			$$invalidate(1, fondo = "bg-white");
    			localStorage.setItem("theme", JSON.stringify({ texto, fondo }));
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Main,
    		Header,
    		Lightbulb: LightbulbOn,
    		texto,
    		fondo,
    		handleChangeTheme
    	});

    	$$self.$inject_state = $$props => {
    		if ('texto' in $$props) $$invalidate(0, texto = $$props.texto);
    		if ('fondo' in $$props) $$invalidate(1, fondo = $$props.fondo);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [texto, fondo, handleChangeTheme];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
