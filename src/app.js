var matchSize = 3;
var fieldSize = 7;
var tileImage=[];
// tileImage[0] = "res/red.png";
// tileImage[1] = "res/green.png";
// tileImage[2] = "res/blue.png";
// tileImage[3] = "res/pink.png";

tileImage[0] = "res/img1.png";
tileImage[1] = "res/img2.png";
tileImage[2] = "res/img3.png";
tileImage[3] = "res/img4.png";

tileImage[4] = "res/granade.png";
tileImage[5] = "res/grass.png";
tileImage[6] = "res/grass_r.png";
tileImage[7] = "res/diamond.png";
//var tileTypes = ["red", "green", "blue", "pink", "sky"];
var tileTypes = ["red", "green", "blue", "pink"];
var tileSize = 52;
var tileArray = [];
var globezLayer;
var startColor = null;
var visitedTiles = [];
var tolerance = 400;
var size;
var layer_pos;
var line;

var plot = [[6,6,6,6,0,0,0],[0,6,6,7,6,0,0],[0,0,6,6,6,6,0],[0,0,0,6,6,6,6],[0,0,1,1,1,1,0],[0,1,1,1,1,0,0],[1,7,1,1,0,0,0]];
//var plot = [[0,6,6,6,6,6,0],[1,1,6,6,6,1,1],[1,6,6,6,6,6,1],[1,1,6,6,6,1,1],[1,6,6,0,6,6,1],[1,1,0,7,0,1,1],[1,1,0,0,0,1,1]];
//var plot = [[0,0,6,6,6,0,0],[0,6,6,6,6,6,0],[6,6,6,0,6,6,6],[6,6,0,7,0,6,6],[1,1,1,0,1,1,1],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0]];
//var plot = [[0,0,6,6,6,0,0],[0,6,6,7,6,6,0],[0,6,6,0,6,6,0],[0,6,6,0,6,6,0],[0,1,1,0,1,1,0],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0]];
//var plot = [[1,1,1,1,1,1,1],[1,0,0,6,0,0,1],[1,0,6,6,6,0,1],[1,0,0,7,0,0,1],[1,0,6,6,6,0,1],[1,0,0,6,0,0,1],[1,1,1,1,1,1,1]];

var line_draw_X;
var line_draw_Y;

var arrowsLayer;

var Diamond_Search_Direction = [[1,0], [0,1], [-1,0], [0, -1]];
var Diamond_Result = []; 

var Diamond_fall_count = 0;

var diamond_count; // label creat for Diamond count
var diamond_count_number = 0;

var score_label;
var score =0;
var move_left = 3;
var move_label;
var win_point = 100;

var DFS_Direction = [[1,0], [0,1], [-1,0], [0, -1], [1,-1], [-1,-1], [-1,1], [1,1]];
var DFS_Visited = [];
var DFS_Result = []; // DFS_Result.length ---- DFS_Result[4].R,DFS_Result[4].C 
var DFS_Stack = [];

var shuffle_element = [];
var new_shuffle_element = [];

var iNode;
var moveLeftNode;
var iNodevisibility = true;
var james = 50;
var james_label;

var press = true;


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

       // cc.log("Talha");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        size = cc.winSize;
        layer_pos = size.width/2 - 150;



        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Best Fiends", "Arial", 25);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2 + 50;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        
        var diamond_spite =  new cc.Sprite.create("res/diamond.png");
        //diamond_spite.setAnchorPoint(cc.p(0.5, 0.5));
        diamond_spite.setPosition(cc.p(size.width / 2 - layer_pos, size.height / 2 + 200));
        diamond_spite.setScaleX(0.7);
        diamond_spite.setScaleY(0.7);
        this.addChild(diamond_spite, 1);

        diamond_count = new cc.LabelTTF(""+diamond_count_number, "Arial", 25);
        // position the label on the center of the screen
        diamond_count.x = size.width / 2 - layer_pos + 35;
        diamond_count.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(diamond_count, 1);



        score_label = new cc.LabelTTF("Score : "+score, "Arial", 30);
        // position the label on the center of the screen
        score_label.x = size.width / 2 + layer_pos + 35;
        score_label.y = size.height / 2 + 200;
       // score_label.setColor(cc.color(255,0,0));
        this.addChild(score_label, 1);

        james_label = new cc.LabelTTF("James : "+james, "Arial", 30);
        james_label.x = size.width / 2 + layer_pos + 35;
        james_label.y = size.height / 2 + 170;
        this.addChild(james_label, 1);


        move_label = new cc.LabelTTF("Move Left: "+move_left, "Arial", 25);
        // position the label on the center of the screen
        move_label.x = size.width / 2 - layer_pos
        move_label.y = size.height / 2 + 170;
       // score_label.setColor(cc.color(255,0,0));
        this.addChild(move_label, 1);

        // // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png);
        // this.sprite.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);
        ///////////////////////////////////////////


        //cc.spriteFrameCache.addSpriteFrames("res/globes.plist", "res/globes.png");
        var backgroundLayer = cc.LayerGradient.create(cc.color(0x255,0x255,0x255,0), cc.color(0x255,0x255,0x255,0));
        //var backgroundLayer = cc.LayerGradient.create();
        this.addChild(backgroundLayer);
        globezLayer = cc.Layer.create();
        globezLayer.setPosition(layer_pos, 0);
        //new cc.layer() can also be used
        this.addChild(globezLayer);

        iNode = new cc.Node();
        iNode.x = size.width/2;
        iNode.y = size.height/2;
        this.addChild(iNode, 1);
        iNode.setVisible(false);

        moveLeftNode = new cc.Node();
        moveLeftNode.x = size.width/2;
        moveLeftNode.y = size.height/2;
        this.addChild(moveLeftNode, 1);
        moveLeftNode.setVisible(false);

        var iButton = new ccui.Button();
        iButton.loadTextures("res/information.png");
        iButton.x= size.width / 2 - 50;
        iButton.y= size.height / 2 + 200;;
        this.addChild(iButton, 1);

        iButton.addTouchEventListener(this.iButtonEvent, this);


        this.createLevel();
        // shuffle required or not
        this.doShuffle();

        // var line =  new cc.DrawNode();
        // line.drawSegment(cc.p(0,50), cc.p(200,200),50, cc.Color(255,0,0, 255));
        // //line.drawDot(cc.Point(0,50), 50, cc.Color(255,0,0));

        cc.eventManager.addListener(touchListener, this);

        arrowsLayer = cc.DrawNode.create();
        this.addChild(arrowsLayer);

        return true;
    },

    iButtonEvent: function(sender, type){
        switch(type){
            case ccui.Widget.TOUCH_BEGAN:

                cc.log("Button");
                iNode.setVisible(iNodevisibility);
                var sprite = new cc.Sprite.create("res/informationpage.png");
                //sprite.setAnchorPoint(0,0);
                sprite.setPosition(0,0);
                iNode.addChild(sprite, 1);

                iNodevisibility = !iNodevisibility;
                break;
        }

    },
    

    createLevel: function(){
        for(var i = 0; i < fieldSize; i ++){
            tileArray[i] = [];
            for(var j = 0;j < fieldSize; j ++){
                this.addTile(i, j);
            }
        }
    },

    addTile:function(row,col){
        
        if(plot[row][col] == 1){
            var randomTile = Math.floor(Math.random()*tileTypes.length);
            //var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tileImage[randomTile]);
            var sprite = cc.Sprite.createWithSpriteFrame(tileImage[randomTile]);
            // new cc.Sprite(spriteFrame) can also be used
            sprite.val = randomTile;
            sprite.picked = false;
            globezLayer.addChild(sprite,0);
            sprite.setPosition((col*tileSize+tileSize/2)+2 , (row*tileSize+tileSize/2)+4);
            //sprite.setScale(2);
            tileArray[row][col] = sprite;
        }
        else
        {
            var sprite;
            
            if (plot[row][col] == 0)
            {
                sprite = cc.Sprite.createWithSpriteFrame(tileImage[5]);
                sprite.val = 5;
            }
            // Block create
            else if( plot[row][col] == 6)
            {
                sprite = cc.Sprite.createWithSpriteFrame(tileImage[6]);
                sprite.val = 6;
            }
            // Diamond create
            else if( plot[row][col] == 7)
            {
                sprite = cc.Sprite.createWithSpriteFrame(tileImage[7]);
                sprite.val = 7;
            }
            globezLayer.addChild(sprite,0);
            sprite.setPosition((col*tileSize+tileSize/2)+2 ,(row*tileSize+tileSize/2)+4 );
            tileArray[row][col] = sprite;
        }
    },

    fallAgainTile:function(i, j){

        var holesBelow = 0;
        var holesLeft = 0;
        var holesRight = 0;
        var current_j = j;
        for(var k = i - 1; k >= 0; k --){
            var fallTile_flag = false;
            if(tileArray[k][current_j] == null){
                holesBelow++;
                fallTile_flag = true;
            }
            else if(current_j-1 >= 0 && tileArray[k][current_j-1] == null){
                holesBelow++;
                holesLeft++;
                current_j--;
                fallTile_flag = true;
            }
            else if(current_j+1 < fieldSize && tileArray[k][current_j+1] == null)                            {
                holesBelow++;
                holesRight++;
                current_j++;
                fallTile_flag = true;
            }
            // else if(current_j-1 >= 0 && tileArray[k+1][current_j-1] == null)
            // {
            //     fallTile_flag = true;
            //     //while(current_j-1 >= 0 && tileArray[k+1][current_j-1] == null){
            //     holesLeft++;
            //     current_j--;   
            //     //}
            // }
            // else if(current_j+1 < fieldSize && tileArray[k+1][current_j+1] == null)
            // {
            //     fallTile_flag = true;
            //     //while(current_j+1 < fieldSize && tileArray[k+1][current_j+1] == null){
            //         holesRight++;
            //         current_j++;
            //     //}
            // }

            if(!fallTile_flag) break;
        }

        if(holesBelow>0){
            var moveAction;
            if(holesLeft == holesRight)
            {
                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x, tileArray[i][j].y-holesBelow*tileSize));
                //tileArray[i - holesBelow][current_j] = tileArray[i][j];
            }
            else if(holesLeft>holesRight)
            {
                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x - (holesLeft-holesRight)*tileSize, tileArray[i][j].y-holesBelow*tileSize));
                //tileArray[i - holesBelow][current_j] = tileArray[i][j];
            }
            else if(holesLeft<holesRight)
            {
                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x + (holesRight-holesLeft)*tileSize, tileArray[i][j].y-holesBelow*tileSize));
                // tileArray[i - holesBelow][current_j] = tileArray[i][j];
            }
            // cc,moveTo() can also be used
            tileArray[i][j].runAction(moveAction);
            tileArray[i - holesBelow][current_j] = tileArray[i][j];
            tileArray[i][j] = null;
            //cc.log(i - holesBelow+" "+current_j);
        }
    },

    fallTile:function(row,col,height){
        //cc.log("fall Tile");

        Diamond_fall_count++;
        var sprite;

        var randomTile = Math.floor(Math.random()*(tileTypes.length));
        //var spriteFrame = cc.spriteFrameCache.getSpriteFrame(tileTypes[randomTile]);
        if(Diamond_fall_count<matchSize*10)
        {
            sprite = cc.Sprite.createWithSpriteFrame(tileImage[randomTile]);
            sprite.val = randomTile;
        }
        else
        {
            sprite = cc.Sprite.createWithSpriteFrame(tileImage[7]);
            sprite.val = 7;
            Diamond_fall_count = 0;
        }
        
        sprite.picked = false;
        globezLayer.addChild(sprite,0);
        sprite.setPosition(col*tileSize+tileSize/2,(fieldSize+height)*tileSize);
        var moveAction = cc.MoveTo.create(0.5, new cc.Point(col*tileSize+tileSize/2,row*tileSize+tileSize/2));
        sprite.runAction(moveAction);
        tileArray[row][col] = sprite;

        //cc.log(row+" "+col);
        // for new tile animation & move below
        this.fallAgainTile(row, col);

        while(tileArray[row][col] == null)
        {
            this.fallTile(row,col,height);
        }
    },

    dfs_visited_search: function(r, c){
        for (var i=0; i<DFS_Visited.length; i++){
            if(DFS_Visited[i].R == r && DFS_Visited[i].C == c)
                return false;
        }
        return true;
    },

    DFS: function(row, col, val){
        //cc.log("R: "+row+" C: "+col+" V: "+val);
        var flag = false;

        DFS_Visited.push({
            R: row,
            C: col
        });
        DFS_Result.push({
            R: row,
            C: col
        });

        for(var i=0; i<DFS_Direction.length; i++){
            if( (row + DFS_Direction[i][0]) >= 0 && (row + DFS_Direction[i][0]) < fieldSize && (col + DFS_Direction[i][1]) >= 0 && (col + DFS_Direction[i][1]) < fieldSize ){
                if(tileArray[row + DFS_Direction[i][0]][col + DFS_Direction[i][1]] != null)
                    if(tileArray[row + DFS_Direction[i][0]][col + DFS_Direction[i][1]].val == val && this.dfs_visited_search(row + DFS_Direction[i][0], col + DFS_Direction[i][1]))
                    {
                        DFS_Stack.push({
                        R: row + DFS_Direction[i][0],
                        C: col + DFS_Direction[i][1]
                        });

                        flag = true; 
                        this.DFS(row + DFS_Direction[i][0], col + DFS_Direction[i][1], tileArray[row + DFS_Direction[i][0]][col + DFS_Direction[i][1]].val)
                    }   
            }
        }

        if(!flag) return;
        DFS_Stack.pop();
    },

    shuffle_need: function(){
        new_shuffle_element = [];
        shuffle_element = [];
        for(var i = fieldSize - 1; i>=0 ; i --){
            for(var j = 0;j < fieldSize; j ++){
                if( !( tileArray[i][j] == null || tileArray[i][j].val == 5 || tileArray[i][j].val == 6 || tileArray[i][j].val == 7) ){
                    DFS_Result = [];
                    DFS_Visited = [];
                    DFS_Stack = [];
                    if(this.dfs_visited_search(i,j)) this.DFS(i, j, tileArray[i][j].val); // dfs call
                    //cc.log(DFS_Result);
                    if(DFS_Result.length>=matchSize) return false;

                    shuffle_element.push({
                        R: i,
                        C: j,
                        V: tileArray[i][j].val
                    });
                    new_shuffle_element.push(tileArray[i][j].val);
                }
            }
        }
        return true;
    },

    Shuffle: function(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    doShuffle: function(){
        var flag = false;

        while(this.shuffle_need())
        {
            //new_shuffle_element.clear();
            flag = true;
            cc.log("shuffle needed");
            this.Shuffle(new_shuffle_element);
            for (var i=0; i<shuffle_element.length; i++){
                // after shuffling pre spite delete & new spite create 
                globezLayer.removeChild(tileArray[shuffle_element[i].R][shuffle_element[i].C]);
                tileArray[shuffle_element[i].R][shuffle_element[i].C] = null;
                var sprite = cc.Sprite.createWithSpriteFrame(tileImage[new_shuffle_element[i]]);
                sprite.val = new_shuffle_element[i];
                sprite.picked = false;
                globezLayer.addChild(sprite,0);
                sprite.setPosition((shuffle_element[i].C*tileSize+tileSize/2)+2 , (shuffle_element[i].R*tileSize+tileSize/2)+4);
                tileArray[shuffle_element[i].R][shuffle_element[i].C] = sprite;
            }

            var shuffle_label = new cc.LabelTTF("Shuffle", "Arial", 40);
            shuffle_label.x = 3*tileSize+tileSize/2;
            shuffle_label.y = 4*tileSize+tileSize/2;
            globezLayer.addChild(shuffle_label, 10);
            shuffle_label.setColor(cc.color(255,0,0));

            var action = new cc.FadeOut.create(1.5);
            var actionIn = new cc.ScaleTo.create(2,2,2);
            var seq = new cc.Sequence.create(actionIn, action);
            shuffle_label.runAction(action);
        }
        
        if(!flag) cc.log("shuffle NOT needed");
        flag =false;
    },

});


var touchListener = cc.EventListener.create({
    event: cc.EventListener.MOUSE,

    iButtonBuy: function(){

        if(press){
            press = false;

        move_left += 2;
        move_label.setString("Move Left: "+move_left);

        james = james - 5;
        james_label.setString("James: "+ james);
        moveLeftNode.setVisible(false);

        setTimeout(function(){
                    press = true;
                }, 2000);
        }
    },

    iiButtonExit: function(){
        cc.log("Buy");
         var scene = new HelloWorldScene2;
            cc.director.pushScene(scene);
    },

    moveBuy: function(){
        cc.log("hello");
        moveLeftNode.setVisible(true);
        var sprite = new cc.Sprite.create("res/viewnode.png");
        sprite.setPosition(0,0);
        moveLeftNode.addChild(sprite, 1);

        var iButton = new ccui.Button();
        iButton.loadTextures("res/buy.png");
        iButton.x= 0;
        iButton.y= -50;
        moveLeftNode.addChild(iButton, 1);

        iButton.addTouchEventListener(this.iButtonBuy, this);

        var iiButton = new ccui.Button();
        iiButton.loadTextures("res/exit.png");
        iiButton.x= 0;
        iiButton.y= -120;
        moveLeftNode.addChild(iiButton, 1);

        iiButton.addTouchEventListener(this.iiButtonExit, this);

    },

    DiamondSearch: function(r, c){
        for (var i=0; i<Diamond_Result.length; i++)
        {
            if(Diamond_Result[i].R == r && Diamond_Result[i].C == c)
                return false;
        }
        return true;
    },

    drawPath:function(){
        arrowsLayer.clear();
        if(visitedTiles.length>0){
            for(var i=1;i<visitedTiles.length;i++){
                arrowsLayer.drawSegment(new cc.Point(visitedTiles[i-1].col*tileSize+tileSize/2 + layer_pos, visitedTiles[i-1].row*tileSize+tileSize/2), new cc.Point(visitedTiles[i].col*tileSize+tileSize/2 + layer_pos, visitedTiles[i].row*tileSize+tileSize/2), 4, cc.color(255, 255, 255, 255));
            }
        }
    },

    onSegment: function(p, q, r){
        if (q.col <= Math.max(p.col, r.col) && q.col >= Math.min(p.col, r.col) && q.row <= Math.max(p.row, r.row) && q.row >= Math.min(p.row, r.row))
           return true;
     
        return false;
    },

    orientation: function(p, q, r){
        var val = (q.row - p.row) * (r.col - q.col) - (q.col - p.col) * (r.row - q.row);
     
        if (val == 0) return 0;  // colinear
     
        return (val > 0)? 1: 2; // clock or counterclock wise
    },

    doIntersect: function(p1, q1, p2, q2){
        var o1 = this.orientation(p1, q1, p2);
        var o2 = this.orientation(p1, q1, q2);
        var o3 = this.orientation(p2, q2, p1);
        var o4 = this.orientation(p2, q2, q1);
     
        // General case
        if(o1 == 0 && o4 == 0) return false;
        if (o1 != o2 && o3 != o4)
        {
            //cc.log("o1:"+o1+" o2:"+o2+" o3:"+o3+" o4:"+o4);
            return true;
        }
     
        // // Special Cases
        // // p1, q1 and p2 are colinear and p2 lies on segment p1q1
        // if (o1 == 0 && this.onSegment(p1, p2, q1)) return true;
     
        // // p1, q1 and p2 are colinear and q2 lies on segment p1q1
        // if (o2 == 0 && this.onSegment(p1, q2, q1)) return true;
     
        // // p2, q2 and p1 are colinear and p1 lies on segment p2q2
        // if (o3 == 0 && this.onSegment(p2, p1, q2)) return true;
     
        //  // p2, q2 and q1 are colinear and q1 lies on segment p2q2
        // if (o4 == 0 && this.onSegment(p2, q1, q2)) return true;
     
        return false; // Doesn't fall in any of the above cases
    },

    Intersect: function(current_R, current_C){
        var new_RC = [];
        new_RC.push({
            row: current_R,
            col: current_C
        });

        if(visitedTiles.length<3) return false;

        for(var i=visitedTiles.length-1; i>0; i--)
            if(this.doIntersect(new_RC[0], visitedTiles[visitedTiles.length-1], visitedTiles[i], visitedTiles[i-1])) //p1, q1, p2, q2
            {
                // cc.log(new_RC[0]);
                // cc.log(visitedTiles[visitedTiles.length-1]);
                // cc.log(visitedTiles[i]);
                // cc.log(visitedTiles[i-1]);
                return true;
            }
            // else
            //     cc.log(visitedTiles[i]);

        return false;
    },

    onMouseDown: function (event) {
        line = new cc.DrawNode();
        //line.drawSegment(cc.p(50,50), cc.p(200,200),2);
        //line.drawDot(cc.p(event._x - layer_pos,event._y), 5, cc.Color(255,255,255, 255));
        globezLayer.addChild(line,0);
        
        //cc.log("onMouseDown");

        var pickedRow = Math.floor(event._y / tileSize);
        //var pickedCol = Math.floor(event._x / tileSize);
        var pickedCol = Math.floor( (event._x - layer_pos) / tileSize);
        //cc.log("Row: "+pickedRow+ " column: "+ pickedCol);
        if ( tileArray[pickedRow][pickedCol].val != 5 && tileArray[pickedRow][pickedCol].val != 6)
            tileArray[pickedRow][pickedCol].setOpacity(128);

        tileArray[pickedRow][pickedCol].picked = true;
        startColor = tileArray[pickedRow][pickedCol].val;

       // cc.log("val: "+ tileArray[pickedRow][pickedCol].val);

        visitedTiles.push({
            row: pickedRow,
            col: pickedCol
        });
    },

    onMouseUp: function(event){
        globezLayer.removeChild(line);
        arrowsLayer.clear();
        startColor=null;

        //cc.log(visitedTiles);

        if(visitedTiles.length>=matchSize){
            move_left--;
            move_label.setString("Move Left: "+move_left);
        }
        
        Diamond_Result = [];
        // for diamond check
        if(visitedTiles.length>= matchSize+1)
        {
            for (var i=0; i<visitedTiles.length; i++)
            {
                for(var j=0; j<Diamond_Search_Direction.length; j++)
                {
                    if( ((visitedTiles[i].row + Diamond_Search_Direction[j][0]) >= 0 && (visitedTiles[i].row + Diamond_Search_Direction[j][0]) < fieldSize ) && ((visitedTiles[i].col + Diamond_Search_Direction[j][1]) >= 0 && (visitedTiles[i].col + Diamond_Search_Direction[j][1]) < fieldSize ) )
                    {
                        if(tileArray[ visitedTiles[i].row + Diamond_Search_Direction[j][0] ][ visitedTiles[i].col + Diamond_Search_Direction[j][1] ] != null)
                        if(tileArray[ visitedTiles[i].row + Diamond_Search_Direction[j][0] ][ visitedTiles[i].col + Diamond_Search_Direction[j][1] ].val == 7)
                        {
                            if(this.DiamondSearch(visitedTiles[i].row + Diamond_Search_Direction[j][0], visitedTiles[i].col + Diamond_Search_Direction[j][1]))
                            Diamond_Result.push({
                                R: visitedTiles[i].row + Diamond_Search_Direction[j][0],
                                C: visitedTiles[i].col + Diamond_Search_Direction[j][1]
                            });
                        }
                    }
                }
            }


            // for diamond remove
            for(var i=0; i<Diamond_Result.length; i++){
                globezLayer.removeChild(tileArray[Diamond_Result[i].R][Diamond_Result[i].C]);
                tileArray[Diamond_Result[i].R][Diamond_Result[i].C]=null;
            }

            if(Diamond_Result.length > 0)
            {
                var dd = new cc.LabelTTF("+"+Diamond_Result.length, "Arial", 30);
                dd.x = size.width / 2 - layer_pos*2 + 35;
                dd.y = size.height / 2 + 200;
                dd.setColor(cc.color(255,0,0));
                globezLayer.addChild(dd, 1);

                var action = new cc.FadeOut.create(1.5);
                var actionIn = new cc.ScaleTo.create(1.5,1.5,1.5);
                var seq = new cc.Sequence.create(actionIn, action);
                dd.runAction(seq);

                diamond_count_number +=  Diamond_Result.length;
                diamond_count.setString(diamond_count_number);

                // Move left Update by Diamond collection
                move_left += 1;
                move_label.setString("Move Left: "+move_left);

                var dd = new cc.LabelTTF("+1", "Arial", 30);
                dd.x = size.width / 2 - layer_pos*2 + 50;
                dd.y = size.height / 2 + 170;
                dd.setColor(cc.color(255,0,0));
                globezLayer.addChild(dd, 1);

                var action = new cc.FadeOut.create(1.5);
                var actionIn = new cc.ScaleTo.create(1.5,1.5,1.5);
                var seq = new cc.Sequence.create(actionIn, action);
                dd.runAction(seq);

                if(Diamond_Result.length>=2)
                {
                    var bonus_point;

                    if(Diamond_Result.length>=4)
                        bonus_point = 50;
                    else if(Diamond_Result.length>=3)
                        bonus_point = 30;
                    else if(Diamond_Result.length>=2)
                        bonus_point = 10;

                    score += bonus_point;
                    score_label.setString("Score: "+score);

                    var dd = new cc.LabelTTF("Bonus +"+bonus_point, "Arial", 30);
                    dd.x = size.width / 2 + 40;
                    dd.y = size.height / 2 + 180;
                    dd.setColor(cc.color(255,0,0));
                    globezLayer.addChild(dd, 1);

                    var action = new cc.FadeOut.create(1.5);
                    var actionIn = new cc.ScaleTo.create(1.5,1.5,1.5);
                    var seq = new cc.Sequence.create(actionIn, action);
                    dd.runAction(seq);

                }
            }
        }

        //cc.log(Diamond_Result);

        //for match tile 
        for(i = 0; i < visitedTiles.length; i ++){
            if(visitedTiles.length<matchSize){ 
                tileArray[visitedTiles[i].row][visitedTiles[i].col].setOpacity(255);
                tileArray[visitedTiles[i].row][visitedTiles[i].col].picked=false;
            }
            else{
                globezLayer.removeChild(tileArray[visitedTiles[i].row][visitedTiles[i].col]);
                tileArray[visitedTiles[i].row][visitedTiles[i].col]=null;
            }
        }

        if(visitedTiles.length>=matchSize)
        {
            for(i = 0; i < visitedTiles.length; i ++){

                if( visitedTiles[i].row - 1 >=0)
                    if(tileArray[visitedTiles[i].row - 1][visitedTiles[i].col] != null)
                    {
                        if(tileArray[visitedTiles[i].row - 1][visitedTiles[i].col].val == 6)
                        {
                            globezLayer.removeChild(tileArray[visitedTiles[i].row -1][visitedTiles[i].col]);
                            tileArray[visitedTiles[i].row-1][visitedTiles[i].col]=null;
                        }
                    }

                if( visitedTiles[i].row + 1 <fieldSize)
                    if(tileArray[visitedTiles[i].row + 1][visitedTiles[i].col] != null)
                    {
                        if(tileArray[visitedTiles[i].row + 1][visitedTiles[i].col].val == 6)
                        {
                            globezLayer.removeChild(tileArray[visitedTiles[i].row +1][visitedTiles[i].col]);
                            tileArray[visitedTiles[i].row+1][visitedTiles[i].col]=null;
                        }
                    }

                if( visitedTiles[i].col + 1 < fieldSize)
                    if(tileArray[visitedTiles[i].row][visitedTiles[i].col + 1] != null)
                    {
                        if(tileArray[visitedTiles[i].row][visitedTiles[i].col + 1].val == 6)
                        {
                            globezLayer.removeChild(tileArray[visitedTiles[i].row][visitedTiles[i].col+1]);
                            tileArray[visitedTiles[i].row][visitedTiles[i].col+1]=null;
                        }
                    }

                if( visitedTiles[i].col - 1 >= 0)
                    if(tileArray[visitedTiles[i].row][visitedTiles[i].col - 1] != null)
                    {
                        if(tileArray[visitedTiles[i].row][visitedTiles[i].col - 1].val == 6)
                        {
                            globezLayer.removeChild(tileArray[visitedTiles[i].row][visitedTiles[i].col-1]);
                            tileArray[visitedTiles[i].row][visitedTiles[i].col-1]=null;
                        }
                    }
            }

            ///////////////////////////////////////////

            // for Score count
            if(visitedTiles.length > 5)
            {
                score += visitedTiles.length*2;
                var dd = new cc.LabelTTF("+"+(visitedTiles.length*2), "Arial", 35);
                dd.x = size.width / 2 + 90;
                dd.y = size.height / 2 + 200;
                dd.setColor(cc.color(255,0,0));
                globezLayer.addChild(dd, 1);

                var action = new cc.FadeOut.create(1.5);
                var actionIn = new cc.ScaleTo.create(1.5,1.5,1.5);
                var seq = new cc.Sequence.create(actionIn, action);
                dd.runAction(seq);
            }
            else
            {
                score += visitedTiles.length;
                var dd = new cc.LabelTTF("+"+visitedTiles.length, "Arial", 35);
                dd.x = size.width / 2 + 90;
                dd.y = size.height / 2 + 200;
                dd.setColor(cc.color(255,0,0));
                globezLayer.addChild(dd, 1);

                var action = new cc.FadeOut.create(1.5);
                var actionIn = new cc.ScaleTo.create(1.5,1.5,1.5);
                var seq = new cc.Sequence.create(actionIn, action);
                dd.runAction(seq);
            }

            score_label.setString("Score : "+score);

            /////////////////////////////////////////////////
        }

        if(visitedTiles.length >= 8)
        {
            //cc.log("Marbelous Play");

            var nice_label = new cc.LabelTTF("Marbelous Play", "Arial", 35);
            nice_label.x = event._x - layer_pos;
            nice_label.y = event._y;
            //nice_label.setColor(255,0,0);
            globezLayer.addChild(nice_label, 10);

            var action = new cc.FadeOut.create(2.0);
            nice_label.runAction(action);
        }
        
        else if(visitedTiles.length >= 6)
        {
           // cc.log("Super Play");

            var nice_label = new cc.LabelTTF("Super Play", "Arial", 35);
            nice_label.x = event._x - layer_pos;
            nice_label.y = event._y;
            globezLayer.addChild(nice_label, 10);

            var action = new cc.FadeOut.create(2.0);
            nice_label.runAction(action);
        }
        
        else if(visitedTiles.length >= 5)
        {
            //cc.log("Nice Play");
            var nice_label = new cc.LabelTTF("Nice Play", "Arial", 35);
            nice_label.x = event._x - layer_pos;
            nice_label.y = event._y;
            globezLayer.addChild(nice_label, 10);

            var action = new cc.FadeOut.create(2.0);
            nice_label.runAction(action);
        }

       
        if(visitedTiles.length>=matchSize){
           // for(j = fieldSize-1 ; j >= 0; j --){
            for(i = 1; i < fieldSize; i ++){
                //for(i = 1; i < fieldSize; i ++){
                for(j = 0 ; j <fieldSize; j ++){
                    if(tileArray[i][j] != null && tileArray[i][j].val != 5 && tileArray[i][j].val != 6 ){
                        var holesBelow = 0;
                        var holesLeft = 0;
                        var holesRight = 0;
                        var current_j = j;
                        for(var k = i - 1; k >= 0; k --){
                            var inter_flag = false;
                            if(tileArray[k][current_j] == null){
                                inter_flag = true;
                                holesBelow++;
                            }
                            else if(current_j-1 >= 0 && tileArray[k][current_j-1] == null)
                            {
                                inter_flag = true;
                                holesBelow++;
                                holesLeft++;
                                current_j--;   
                            }
                            else if(current_j+1 < fieldSize && tileArray[k][current_j+1] == null)
                            {
                                inter_flag = true;
                                holesBelow++;
                                holesRight++;
                                current_j++;
                            }
                            // else if(current_j-1 >= 0 && tileArray[k+1][current_j-1] == null)
                            // {
                            //     inter_flag = true;
                            //     //while(current_j-1 >= 0 && tileArray[k+1][current_j-1] == null){
                            //     holesLeft++;
                            //     current_j--;   
                            //     //}
                            // }
                            // else if(current_j+1 < fieldSize && tileArray[k+1][current_j+1] == null)
                            // {
                            //     inter_flag = true;
                            //     //while(current_j+1 < fieldSize && tileArray[k+1][current_j+1] == null){
                            //         holesRight++;
                            //         current_j++;
                            //     //}
                            // }

                            if(!inter_flag) break;
                        }


                        if(holesBelow>0){
                            var moveAction;
                            if(holesLeft == holesRight)
                            {
                                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x, tileArray[i][j].y-holesBelow*tileSize));
                                //tileArray[i - holesBelow][current_j] = tileArray[i][j];
                            }
                            else if(holesLeft>holesRight)
                            {
                                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x - (holesLeft-holesRight)*tileSize, tileArray[i][j].y-holesBelow*tileSize));
                                //tileArray[i - holesBelow][current_j] = tileArray[i][j];
                            }
                            else if(holesLeft<holesRight)
                            {
                                moveAction = cc.MoveTo.create(0.5, new cc.Point(tileArray[i][j].x + (holesRight-holesLeft)*tileSize, tileArray[i][j].y-holesBelow*tileSize));
                               // tileArray[i - holesBelow][current_j] = tileArray[i][j];
                            }
                            // cc.moveTo() can also be used
                            tileArray[i][j].runAction(moveAction);
                            tileArray[i - holesBelow][current_j] = tileArray[i][j];
                            tileArray[i][j] = null;
                        }
                    }
                }
            }

            for(var i = 0; i < fieldSize; i ++){
                for(j = fieldSize-1; j>=0; j --){
                    if(tileArray[j][i] != null){
                        break;
                    }
                }
                var missingGlobes = fieldSize-1-j;
                //cc.log("missingGlobes: "+missingGlobes);
                if(missingGlobes>0){
                    for(var j=0;j<missingGlobes;j++){
                        if(tileArray[fieldSize-j-1][i] == null){
                        var target = event.getCurrentTarget();
                        target.fallTile(fieldSize-j-1,i,missingGlobes-j);   
                        }
                    }
                }
            }

            var target = event.getCurrentTarget();
            target.doShuffle();
        }

        visitedTiles = [];

        // For Game Terminant

        if(score>=win_point){
            var scene = new HelloWorldScene2;
            cc.director.pushScene(scene);
        }

        if(move_left == 0){
            
            var that = this;
            setTimeout(function(){
                that.moveBuy();
            }, 500);
        }

    },

    onMouseMove: function(event){
        if(startColor!=null && (startColor!=5 && startColor!=6) ){
            
            var currentRow = Math.floor(event._y / tileSize);
            //var currentCol = Math.floor(event._x / tileSize);
            var currentCol = Math.floor( (event._x - layer_pos) / tileSize);
            var centerX = currentCol * tileSize + tileSize / 2;
            var centerY = currentRow * tileSize + tileSize / 2;
            //var distX = event._x - centerX;
            var distX = (event._x - layer_pos) - centerX;
            var distY = event._y - centerY;
            if(distX * distX + distY * distY < tolerance){

                // for line draw
                // if(tileArray[currentRow][currentCol].val==startColor)
                //     line.drawDot(cc.p(event._x - layer_pos,event._y), 5, cc.Color(255,255,255, 255));

                if(!tileArray[currentRow][currentCol].picked){
                    if(Math.abs(currentRow - visitedTiles[visitedTiles.length - 1].row) <= 1 && Math.abs(currentCol - visitedTiles[visitedTiles.length -1].col) <= 1){
                        if(tileArray[currentRow][currentCol].val==startColor){
                            // line.drawDot(cc.p(event._x - layer_pos,event._y), 5, cc.Color(255,255,255, 255));
                            // cc.log("onMouseMove");

                            // if(!this.Intersect(currentRow, currentCol)){
                            //     cc.log("Not Intersect");
                            // }
                            // else
                            //     cc.log("Intersect");

                            if(!this.Intersect(currentRow, currentCol)){
                                tileArray[currentRow][currentCol].setOpacity(128);
                                tileArray[currentRow][currentCol].picked=true;
                                visitedTiles.push({
                                    row:currentRow,
                                    col:currentCol
                                });
                            }
                        }
                    }
                }
                else{
                    if(visitedTiles.length>=matchSize && currentRow == visitedTiles[visitedTiles.length - 2].row && currentCol == visitedTiles[visitedTiles.length - 2].col){
                        tileArray[visitedTiles[visitedTiles.length - 1].row][visitedTiles[visitedTiles.length - 1].col].setOpacity(255);
                        tileArray[visitedTiles[visitedTiles.length - 1].row][visitedTiles[visitedTiles.length - 1].col].picked=false;
                        visitedTiles.pop();
                    }
                }

                this.drawPath();
            }
        }
    },
    // end of onMouseMove
});
 

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

