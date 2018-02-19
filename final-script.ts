import { Sprite, Application, Graphics, DisplayObject, Rectangle, Text } from "pixi.js";

const app: Application = new Application(1250, 500);
document.body.appendChild(app.view);

let background: Sprite = Sprite.fromImage("./background.png");
let wasd: Sprite = Sprite.fromImage("./wasdkeys.png");
let arrows: Sprite = Sprite.fromImage("./arrowkeys.png");
let spaceBar: Sprite = Sprite.fromImage("./spacebar.png");
let questionMark: Sprite = Sprite.fromImage("./questionmark.png");
let move1: Text = new Text("Move");
let move2: Text = new Text("Move");
let shoot: Text = new Text("Shoot");
let shoot2: Text = new Text("Shoot");
let p1: Text = new Text("Player 1 Controls");
let p2: Text = new Text("Player 2 Controls");
let title: Text = new Text("MEME MACHINES");
let toGamePage: Text = new Text("Hit Enter to play");
let proceed: Text = new Text("Click to Continue");
let objective: Text = new Text("Objective: ");
let instructions: Text = new Text("Shoot the other opponent in order to win");

app.stage.addChild(background);


function startScreen(): void {
    app.stage.addChild(title, toGamePage);
    title.style.fill = 0xffffff;
    title.style.fontSize = 60;
    title.style.fontFamily = "Impact";
    title.x = 450;
    title.y = 150;
    toGamePage.style.fill = 0xffffff;
    toGamePage.x = 550;
    toGamePage.y = 250;
    window.onkeypress = function (e: KeyboardEvent): void {
        const PLAY: number = 13;
        if (e.keyCode === PLAY) {
            introPage();
        }
    };
}
startScreen();

export function introPage(): void {
    app.stage.addChild(wasd, arrows, spaceBar, questionMark, move1, shoot, move2, shoot2, p1, p2, instructions, objective, proceed);
    app.stage.removeChild(title);
    app.stage.removeChild(toGamePage);
    wasd.scale.x = .5;
    wasd.scale.y = .5;
    arrows.scale.x = .5;
    arrows.scale.y = .5;
    spaceBar.scale.x = .5;
    spaceBar.scale.y = .5;
    questionMark.scale.x = .1;
    questionMark.scale.y = .1;
    wasd.x = 100;
    wasd.y = 200;
    spaceBar.x = 100;
    spaceBar.y = 340;
    arrows.x = 1000;
    arrows.y = 200;
    questionMark.x = 1060;
    questionMark.y = 350;
    move1.style.fill = 0xffffff;
    shoot.style.fill = 0xffffff;
    move1.x = 140;
    move1.y = 170;
    shoot.x = 140;
    shoot.y = 310;
    move2.style.fill = 0xffffff;
    shoot2.style.fill = 0xffffff;
    move2.x = 1050;
    move2.y = 170;
    shoot2.x = 1050;
    shoot2.y = 320;
    p1.style.fill = 0xffffff;
    p2.style.fill = 0xffffff;
    p1.x = 90;
    p1.y = 100;
    p2.x = 980;
    p2.y = 100;
    instructions.style.fill = 0xffffff;
    objective.style.fill = 0xffffff;
    objective.style.fontSize = 30;
    objective.x = 575;
    objective.y = 100;
    instructions.x = 400;
    instructions.y = 175;
    proceed.buttonMode = true;
    proceed.style.fill = 0xffffff;
    window.onclick = function (e: MouseEvent): void {
        if (proceed.buttonMode === true) {
            gamePage();
        }
    };
    proceed.x = 540;
    proceed.y = 320;
}


let player1: Sprite = Sprite.fromImage("./player1.png");
player1.scale.x = .3;
player1.scale.y = .5;
player1.y = 1; 

let player2: Sprite = Sprite.fromImage("./player 2.png");
player2.scale.x = .2;
player2.scale.y = .33;
player2.x = 1150;
player2.y = 1; 


function gamePage(): void {
    app.stage.addChild(player1);
    app.stage.addChild(player2);
    app.stage.removeChild(wasd);
    app.stage.removeChild(arrows);
    app.stage.removeChild(spaceBar);
    app.stage.removeChild(questionMark);
    app.stage.removeChild(move1);
    app.stage.removeChild(move2);
    app.stage.removeChild(shoot);
    app.stage.removeChild(shoot2);
    app.stage.removeChild(p1);
    app.stage.removeChild(p2);
    app.stage.removeChild(title);
    app.stage.removeChild(toGamePage);
    app.stage.removeChild(instructions);
    app.stage.removeChild(objective);
    app.stage.removeChild(proceed);
}


let player1Bullet: Sprite = Sprite.fromImage("./player1Bullet.png");
player1Bullet.scale.x = .3;
player1Bullet.scale.y = .1;

let bullets: Sprite[] = [];

let player2Bullet: Sprite = Sprite.fromImage("./player2bullet.gif");
player2Bullet.scale.x = .3;
player2Bullet.scale.y = .1;

let bullets2: Sprite[] = []; 


app.ticker.add(function (delta: number): void {
    for (let i: number = 0; i < bullets.length; i++) {
        bullets[i].x += 5;
        if (isColliding(player2, bullets[i])) {
            for (let j: number = 0; j < bullets.length; j++) {
                for (let k: number = 0; k < bullets2.length; k++) {
                    app.stage.removeChild(bullets[j]);
                    app.stage.removeChild(bullets2[k]); 
                    bullets[j].x += 1300;
                    bullets2[k].x -= 1300; 
                }
            }
            app.stage.removeChild(player2);
            winnerP1();
            window.onkeypress = function (e: KeyboardEvent): void {
                const CONTINUE: number = 13;
                if (e.keyCode === CONTINUE) {
                    reset();
                }
            };
        }
    }
});

app.ticker.add(function(delta: number): void {
    for (let i: number = 0; i < bullets.length; i++) {
        for (let j: number = 0; j < bullets2.length; j++) {
            if (isColliding(bullets[i], bullets2[j])) {
                app.stage.removeChild(bullets[i]);
                app.stage.removeChild(bullets2[j]); 
                bullets[i].x += 1300;
                bullets2[j].x -= 1300; 
            }
        }
    }
});

app.ticker.add(function (delta: number): void {
    for (let i: number = 0; i < bullets2.length; i++) {
        bullets2[i].x -= 5;
        if (isColliding(player1, bullets2[i])) {
            for (let j: number = 0; j < bullets2.length; j++) {
                for (let k: number = 0; k < bullets.length; k++) {
                    app.stage.removeChild(bullets2[j]);
                    app.stage.removeChild(bullets[k]); 
                    bullets2[j].x -= 1300;
                    bullets[k].x += 1300; 
                }
            }
            app.stage.removeChild(player1);
            winnerP2();
            window.onkeypress = function (e: KeyboardEvent): void {
                const CONTINUE: number = 13;
                if (e.keyCode === CONTINUE) {
                    reset();
                }
            };

        }
    }
});

let p1Up: boolean;
let p1Down: boolean;
let p1Right: boolean;
let p1Left: boolean; 
let p2Up: boolean;
let p2Down: boolean;
let p2Right: boolean; 
let p2Left: boolean; 
let p1Shoot: boolean;
let p2Shoot: boolean;

app.ticker.add(function (delta: number): void {
    if (p1Up === true) {
        if (player1.y <= 0) {
            player1.y += 500; 
        } 
        player1.y -= 5;
    }
    if (p1Down === true) {
        if (player1.y > 375) {
            player1.y -= 500; 
        }
        player1.y += 5;
    }
    if (p1Right === true) {
        if (player1.x > 1150) {
            player1.x = 1150; 
        }
        player1.x += 5; 
    }
    if (p1Left === true) {
        if (player1.x <= 0) {
            player1.x += 10; 
        }
        player1.x -= 5; 
    }
    if (p2Up === true) {
        if (player2.y <= 0) {
            player2.y += 500; 
        }
        player2.y -= 5;
    }
    if (p2Down === true) {
        if (player2.y > 375) {
            player2.y -= 500; 
        }
        player2.y += 5;
    }
    if (p2Right === true) {
        if (player2.x >= 1150) {
            player2.x = 1150; 
        }
        player2.x += 5; 
    }
    if (p2Left === true) {
        if (player2.x <= 0) {
            player2.x += 10; 
        }
        player2.x -= 5; 
    }
});


window.onkeyup = function (move: KeyboardEvent): void {
    const LEFT: number = 65;
    const UP: number = 87;
    const RIGHT: number = 68;
    const DOWN: number = 83;
    const STEP: number = 5;
    const SHOOT: number = 32;
    const LEFT2: number = 37;
    const UP2: number = 38;
    const RIGHT2: number = 39;
    const DOWN2: number = 40;
    const STEP2: number = 5;
    const SHOOT2: number = 191;
    if (move.keyCode === UP) {
        p1Up = false;
    }
    if (move.keyCode === DOWN) {
        p1Down = false;
    }
    if (move.keyCode === RIGHT) {
        p1Right = false; 
    }
    if (move.keyCode === LEFT) {
        p1Left = false; 
    }
    if (move.keyCode === UP2) {
        p2Up = false;
    }
    if (move.keyCode === DOWN2) {
        p2Down = false;
    }
    if (move.keyCode === RIGHT2) {
        p2Right = false; 
    }
    if (move.keyCode === LEFT2) {
        p2Left = false; 
    }
    if (move.keyCode === SHOOT) {
        p1Shoot = false;
    }
    if (move.keyCode === SHOOT2) {
        p2Shoot = false;
    }
};

window.onkeydown = function (move: KeyboardEvent): void {
    const LEFT: number = 65;
    const UP: number = 87;
    const RIGHT: number = 68;
    const DOWN: number = 83;
    const STEP: number = 5;
    const SHOOT: number = 32;
    const LEFT2: number = 37;
    const UP2: number = 38;
    const RIGHT2: number = 39;
    const DOWN2: number = 40;
    const STEP2: number = 5;
    const SHOOT2: number = 191;
    if (move.keyCode === UP) {
        p1Up = true;
    }
    if (move.keyCode === DOWN) {
        p1Down = true;
    }
    if (move.keyCode === RIGHT) {
        p1Right = true; 
    }
    if (move.keyCode === LEFT) {
        p1Left = true;
    }
    if (move.keyCode === UP2) {
        p2Up = true;
    }
    if (move.keyCode === DOWN2) {
        p2Down = true;
    }
    if (move.keyCode === RIGHT2) {
        p2Right = true;
    } 
    if (move.keyCode === LEFT2) {
        p2Left = true; 
    }
    if (move.keyCode === SHOOT) {
        p1Shoot = true;
    }
    if (move.keyCode === SHOOT2) {
        p2Shoot = true;
    }
    if (p1Shoot === true) {
        let sprite: Sprite = Sprite.fromImage("./player1Bullet.png");
        sprite.x = player1.x + 65;
        sprite.y = player1.y + 75;
        sprite.scale.x = .3;
        sprite.scale.y = .1;
        bullets.push(sprite);
        app.stage.addChild(sprite);
        player1Bullet.x = player1.x + 65;
        player1Bullet.y = player1.y + 75;
    }
    if (p2Shoot === true) {
        let sprite: Sprite = Sprite.fromImage("./player2bullet.gif");
        sprite.x = player2.x;
        sprite.y = player2.y + 75;
        sprite.scale.x = .3;
        sprite.scale.y = .1;
        bullets2.push(sprite);
        app.stage.addChild(sprite);
        player2Bullet.x = player2.x + 65;
        player2Bullet.y = player2.y + 75;
    }
};

function isColliding(a: DisplayObject, b: DisplayObject): boolean {
    const ab: Rectangle = a.getBounds();
    const bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function reset(): void {
    player1.x = 0;
    player1.y = 0;
    player2.x = 1150;
    player2.y = 0;
    app.stage.removeChild(messageBox);
    app.stage.removeChild(p1Wins);
    app.stage.removeChild(p2Wins);
    app.stage.addChild(player1, player2);
}

let winner: boolean = true;
let p1Wins: Text = new Text("Game Over: Player 1 Wins! Press enter to continue.");
let p2Wins: Text = new Text("Game Over: Player 2 Wins! Press enter to continue.");
let messageBox: Graphics = new Graphics();

function winnerP1(): void {
    p1Wins.x = 335;
    p1Wins.y = 270;
    p1Wins.style.fill = 0xffffff;
    messageBox.beginFill(0x4444aa, 0.4);
    messageBox.drawRect(0, 0, 620, 70);
    messageBox.x = 325;
    messageBox.y = 250;
    app.stage.addChild(messageBox);
    app.stage.addChild(p1Wins);
}

function winnerP2(): void {
    p2Wins.x = 335;
    p2Wins.y = 270;
    p2Wins.style.fill = 0xffffff;
    messageBox.beginFill(0x4444aa, 0.4);
    messageBox.drawRect(0, 0, 620, 70);
    messageBox.x = 325;
    messageBox.y = 250;
    app.stage.addChild(messageBox);
    app.stage.addChild(p2Wins);
}

