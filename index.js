const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './assets/map.png'

const playerImage = new Image()
playerImage.src = './assets/playerDown.png'

class Sprite {
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

let cropWidth, cropHeight, playerX, playerY;
let background;

playerImage.onload = () => {
    cropWidth = playerImage.width / 4;
    cropHeight = playerImage.height;

    image.onload = () => {
        const scale = 1;
        const width = image.width * scale;
        const height = image.height * scale;

        canvas.width = width;
        canvas.height = height;

        background = new Sprite({
            position: {
                x: -250,
                y: -300
            },
            image: image
        });

        playerX = canvas.width / 5 - cropWidth / 3;
        playerY = canvas.height / 7.5 - cropHeight / 3;

        animate();
    };
};

const keys = {
w: {
    pressed: false
},
a: {
    pressed: false
},
s: {
    pressed: false
},
d: {
    pressed: false
}

}

function animate() {
    window.requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    background.draw();

    const cropX = 0;
    const cropY = 0;

    c.drawImage(
        playerImage,
        cropX, cropY, cropWidth, cropHeight,
        playerX, playerY, cropWidth, cropHeight
    );

    if (keys.w.pressed){
        background.position.y = background.position.y - 3
    }
}

window.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break;
        case 'a':
            keys.a.pressed = true
            break;
        case 's':
            keys.s.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
    }
});

window.addEventListener('keyup', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
    }
});
