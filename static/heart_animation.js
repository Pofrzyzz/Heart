// Function to create the heart hypnosis effect and dynamic message
function heartHypnosis() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let hearts = [];
    const colors = [
        '#EE4B2B', '#D22B2B', '#D2042D', '#F88379', '#FF0000'
    ];  // Different shades of red for the hearts

    // Function to draw a heart at a certain scale
    function drawHeart(x, y, scale, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.01) {
            let hx = 16 * Math.sin(t) ** 3;
            let hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            ctx.lineTo(x + hx * scale, y - hy * scale);
        }
        ctx.closePath();
        ctx.fill();
    }

    // Create a new heart object
    function createHeart() {
        return {
            scale: 1,  // Initial scale of the heart
            color: colors[Math.floor(Math.random() * colors.length)],  // Random color for each heart
            x: canvas.width / 2,  // Center the heart horizontally
            y: canvas.height / 2,  // Center the heart vertically
        };
    }

    // Generate a new heart every few frames
    let heartInterval = 0;
    const heartIntervalMax = 100;

    function animateHearts() {
        if (heartInterval % heartIntervalMax === 0) {
            hearts.push(createHeart());
        }
        heartInterval++;

        hearts.forEach((heart) => {
            drawHeart(heart.x, heart.y, heart.scale, heart.color);
            heart.scale += 0.05;  // Slower growth
        });

        requestAnimationFrame(animateHearts);
    }

    animateHearts();

    // Dynamic message logic
    const message = document.querySelector('.message');
    const messages = ['I love you', 'Te amo', 'Je t\'aime', 'Ich liebe dich', 'Saya cinta kamu', '愛してる'];
    const fonts = ['Roboto', 'Lobster', 'Pacifico', 'Dancing Script', 'Great Vibes'];
    
    let messageIndex = 0;

    function updateMessage() {
        message.textContent = messages[messageIndex % messages.length];
        message.style.fontFamily = fonts[messageIndex % fonts.length];
        messageIndex++;
    }

    // Change message every 1 second
    setInterval(updateMessage, 1000);

    // Firefly cursor effect
    let fireflyParticles = [];

    function drawFirefly(x, y, radius, opacity) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'white';
        ctx.fill();
    }

    function updateFireflies() {
        fireflyParticles = fireflyParticles.filter(p => p.opacity > 0);

        fireflyParticles.forEach(p => {
            drawFirefly(p.x, p.y, p.radius, p.opacity);
            p.radius += 0.2;
            p.opacity -= 0.02;  // Fade out over time
        });

        requestAnimationFrame(updateFireflies);
    }

    canvas.addEventListener('mousemove', (e) => {
        fireflyParticles.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            opacity: 1
        });
    });

    // Start the firefly animation
    updateFireflies();
}

window.onload = heartHypnosis;
