
var HelloWorldLayer2 = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var background =  new cc.Sprite.create(res.background2_png);
        var background_size = background.getContentSize();
        background.setScaleX(background_size.width/size.width);
        background.setScaleY(background_size.height/size.height);
        this.addChild(background, 0);

        var celebartion;
        var winorloss;
        if(score >= win_point)
        {
            winorloss = "Congratulation!!\n    You Win";
            if(move_left > 0)
            {
                score += move_left*10;   
                winorloss += "\n Bonus: "+move_left*10;
            }
            celebartion =  new cc.Sprite.create("res/celebartion.gif");
        }
        else
        {
            celebartion =  new cc.Sprite.create("res/celebartionloss.png");
            winorloss = "Opps!! You Loss"
        }

        celebartion.setPosition(cc.p(size.width / 2, size.height/2 + 100));
        celebartion.setScaleX(0.5);
        celebartion.setScaleY(0.5);
        this.addChild(celebartion, 1);

        var game_over = new cc.LabelTTF(""+winorloss+"\nTotal Score: "+score, "Arial", 38, cc.TEXT_ALIGNMENT_CENTER);
        game_over.x = size.width/2;
        game_over.y = size.height/2 -50;
        game_over.setColor(0,0,255);
        this.addChild(game_over, 1);

        return true;
    }   
});

var HelloWorldScene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer2();
        this.addChild(layer);
    }
});
