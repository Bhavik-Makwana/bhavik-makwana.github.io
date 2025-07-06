// Three.js variables for both canvases
let scene1, camera1, renderer1, sphere1;
let scene2, camera2, renderer2, sphere2;
let animationId1, animationId2;
let rotationSpeed = 0.01;
let mouseX = 0;
let mouseY = 0;

// Initialize Three.js when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the 27signatures page
    if (window.location.pathname.includes('27signatures.html') || document.getElementById('canvas')) {
        initThreeJS();
    }
});

// Initialize Three.js for both canvases
function initThreeJS() {
    const canvas1 = document.getElementById('canvas');
    const canvas2 = document.getElementById('canvas2');
    
    if (canvas1) {
        initCanvas(canvas1, 'canvas1');
    }
    
    if (canvas2) {
        initCanvas(canvas2, 'canvas2');
    }
    
    // Add event listeners
    addEventListeners();
}

// Initialize a single canvas
function initCanvas(canvas, canvasId) {
    // Get canvas dimensions
    const canvasRect = canvas.getBoundingClientRect();
    const width = canvasRect.width;
    const height = canvasRect.height;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create sphere with appropriate texture
    const sphere = createSphere(scene, canvasId === 'canvas2');

    // Add lights
    addLights(scene);

    // Store references based on canvas ID
    if (canvasId === 'canvas1') {
        scene1 = scene;
        camera1 = camera;
        renderer1 = renderer;
        sphere1 = sphere;
        animate1();
    } else {
        scene2 = scene;
        camera2 = camera;
        renderer2 = renderer;
        sphere2 = sphere;
        animate2();
    }
}

// Create sphere geometry with optional texture
function createSphere(scene, useTexture = false) {
    // Create geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    let material;
    
    if (useTexture) {
        // Create texture loader
        const textureLoader = new THREE.TextureLoader();
        
        // Load the baseball texture
        const texture = textureLoader.load('assets/baseball_upscaled_rot.jpg', 
            function(texture) {
                // Texture loaded successfully
                console.log('Baseball texture loaded successfully');
            },
            function(progress) {
                // Loading progress
                console.log('Loading texture...', (progress.loaded / progress.total * 100) + '%');
            },
            function(error) {
                // Error loading texture
                console.error('Error loading texture:', error);
                // Fallback to basic material
                material = new THREE.MeshPhongMaterial({
                    color: 0x8B4513,
                    transparent: true,
                    opacity: 0.9,
                    shininess: 100
                });
            }
        );
        
        // Create material with texture
        material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
    } else {
        // Create material without texture (clean baseball)
        material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
    }

    // Create mesh
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    
    scene.add(sphere);
    return sphere;
}

// Add lighting to a scene
function addLights(scene) {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Point light for additional glow
    const pointLight = new THREE.PointLight(0x4a90e2, 0.3, 100);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);
}

// Animation loop for first canvas
function animate1() {
    animationId1 = requestAnimationFrame(animate1);

    if (sphere1) {
        // Smooth rotation
        sphere1.rotation.x += rotationSpeed;
        sphere1.rotation.y += rotationSpeed * 0.7;
        
        // Add subtle mouse interaction
        sphere1.rotation.x += mouseY * 0.001;
        sphere1.rotation.y += mouseX * 0.001;
    }

    if (renderer1 && scene1 && camera1) {
        renderer1.render(scene1, camera1);
    }
}

// Animation loop for second canvas
function animate2() {
    animationId2 = requestAnimationFrame(animate2);

    if (sphere2) {
        // Smooth rotation (slightly different speed for variety)
        sphere2.rotation.x += rotationSpeed * 0.8;
        sphere2.rotation.y += rotationSpeed * 0.9;
        
        // Add subtle mouse interaction
        sphere2.rotation.x += mouseY * 0.001;
        sphere2.rotation.y += mouseX * 0.001;
    }

    if (renderer2 && scene2 && camera2) {
        renderer2.render(scene2, camera2);
    }
}

// Add event listeners
function addEventListeners() {
    // Mouse movement for interaction
    document.addEventListener('mousemove', function(event) {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle window resize
    window.addEventListener('resize', onCanvasResize);
}

// Handle canvas resize for both canvases
function onCanvasResize() {
    const canvas1 = document.getElementById('canvas');
    const canvas2 = document.getElementById('canvas2');
    
    if (canvas1 && camera1 && renderer1) {
        const canvasRect1 = canvas1.getBoundingClientRect();
        const width1 = canvasRect1.width;
        const height1 = canvasRect1.height;

        camera1.aspect = width1 / height1;
        camera1.updateProjectionMatrix();
        renderer1.setSize(width1, height1);
    }
    
    if (canvas2 && camera2 && renderer2) {
        const canvasRect2 = canvas2.getBoundingClientRect();
        const width2 = canvasRect2.width;
        const height2 = canvasRect2.height;

        camera2.aspect = width2 / height2;
        camera2.updateProjectionMatrix();
        renderer2.setSize(width2, height2);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (animationId1) {
        cancelAnimationFrame(animationId1);
    }
    if (animationId2) {
        cancelAnimationFrame(animationId2);
    }
});
