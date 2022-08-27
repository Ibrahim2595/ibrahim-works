(function() {
    let scene,
    renderer,
    camera,
    model,
    neck,
    waist,
    possibleAnims,
    mixer,
    idle,
    clock = new THREE.Clock(),
    currentlyAnimating = false,
    raycaster = new THREE.Raycaster(),
    loaderAnim = document.getElementById('js-loader');

    init();
    function init() {
        const MODEL_PATH = '/models/ib-avatar-anim4.glb';

        const canvas = document.querySelector('#c');
        const background = 0xf1f1f1;
    
        // Init the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(background);
        scene.fog = new THREE.Fog(background, 60, 100);

        // Init the renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        // Init the camera
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;
        camera.position.x = 0;
        camera.position.y = 3;

        // Init the model
        var loader = new THREE.GLTFLoader();
        loader.load(MODEL_PATH, function(gltf) {
            model = gltf.scene;
            let fileAnimations = gltf.animations;

            model.traverse(o => {
                if (o.isMesh) {
                    o.castShadow = true;
                    o.receiveShadow = true;
                }
            });

            // Set the models initial scale
            model.scale.set(6, 6, 6);
            model.position.y = -4;
            model.position.x = 18;
            model.rotation.y = -0.4;
            scene.add(model);
            // loaderAnim.remove();

            mixer = new THREE.AnimationMixer(model);
            let idleAnim = THREE.AnimationClip.findByName(fileAnimations, 'greeting');
            // let greetAnim = THREE.AnimationClip.findByName(fileAnimations, 'greeting');
            idle = mixer.clipAction(idleAnim);
            // greet = mixer.clipAction(greetAnim);
            idle.play();
            // greet.play();    
        },

        undefined,
        function(error) {
            console.error(error);
        });

        // Add lights
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.62);
        hemiLight.position.set(0, 50, 0);
        // Add hemisphere light
        scene.add(hemiLight);
        // Add directional light
        let d = 18.25;
        let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
        dirLight.position.set(-8, 12, 8);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 1500;
        dirLight.shadow.camera.left = d * -1;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = d * -1;
        // Add directional Light to scene
        scene.add(dirLight);

        // Add floor
        let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        let floorMaterial = new THREE.MeshPhongMaterial({color: 0xeeeeee, shininess: 0});
        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
        floor.receiveShadow = true;
        floor.position.y = -4;
        scene.add(floor);

        // let geometry = new THREE.SphereGeometry(8, 32, 32);
        // let material = new THREE.MeshBasicMaterial({ color: 0x9bffaf }); // 0xf2ce2e 
        // let sphere = new THREE.Mesh(geometry, material);
        // sphere.position.z = -15;
        // sphere.position.y = 5;
        // sphere.position.x = -0.25;
        // scene.add(sphere);  
    }

    function update(){
        if (mixer) {
            mixer.update(clock.getDelta());
          }
          
        if (resizeRenderToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
        requestAnimationFrame(update);
    }
    update();

    function resizeRenderToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let canvasPixelWidth = canvas.width / window.devicePixelRatio;
        let canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    })();