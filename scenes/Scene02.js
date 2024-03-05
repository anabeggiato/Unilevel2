var player;
var pregador;
var chao;
var playernoChao;
var teclado; 
var bacteria;
var maquina1;
var maquina2;

class Scene02 extends Phaser.Scene{
    
    constructor(){
        super({key: "Scene02"});
    }

    preload(){
        this.load.image('bg2','assets/C2/bg2.png');
        this.load.spritesheet('player','assets/ursofofo.png', { frameWidth: 383, frameHeight: 255 });
        this.load.image('pregador','assets/C2/pregador.png');
        this.load.image('chao2','assets/C2/chao2.png');
        this.load.image('maquina','assets/C2/maquina.png');
        this.load.image('bacteria','assets/C2/bacteria.png');
    };
    create(){
        teclado = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, 3600, 600)

        this.add.image(450,300,'bg2');
        this.add.image(1350,300,'bg2');
        this.add.image(2250,300,'bg2');
        this.add.image(3150,300,'bg2');

        player = this.physics.add.sprite(200,500,'player').setSize(100,150);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start:0, end:1 }),
            frameRate: 8,
            repeat: -1
        });
        this.cameras.main.startFollow(player);
        player.setDragY(0.6);
        
        bacteria = this.physics.add.sprite(800, 500, 'bacteria').setBounce(1).setScale(0.4).setSize(180, 250);
        bacteria.setVelocityX(100);
        bacteria.setPushable(false);
        this.physics.add.collider(player,bacteria);
        
        chao = this.physics.add.staticImage(1500,600,'chao2').setSize(5000, 30).setScale(20,1);
        this.physics.add.collider(player,chao,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria,chao);
        
        pregador = this.physics.add.staticImage(300,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador, () => {
            playernoChao = true;
        });
        
        maquina1 = this.physics.add.staticImage(700,500, 'maquina').setSize(140, 170).setScale(0.5);
        this.physics.add.collider(player,maquina1, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria,maquina1);

        maquina2 = this.physics.add.staticImage(2000,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina2, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria,maquina2);
    };
    update(){
        if(teclado.left.isDown && teclado.right.isDown){
            //quando as duas teclas são pressionada, o player para
            player.setVelocityX(0);
        //anda pra esquerda
        }else if(teclado.left.isDown){        
            player.setFlip(true);     
            player.setVelocityX(-300);
            player.anims.play('andar', true);
        //anda pra direita
        }else if (teclado.right.isDown){                  
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
        }else{
            //quando nenhuma tecla eh pressionada, o player para
            player.setVelocityX(0);
            player.anims.play('andar', false);
        };
        //pular quando o botão pra cima está apertado e ele está no chão
        if(teclado.up.isDown && playernoChao == true){
            player.setVelocityY(-300);
            player.anims.play('andar', true);
            playernoChao = false;  
        };
    };
};
