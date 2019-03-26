(function(){
    var model={
        interv : "",
        gestures: ['scissors.png','paper.png','rock.png'],
        count: 4,
        playerScore:0,
        AiScore:0,
        aiAnswer : function(){
            let rand = Math.floor(Math.random()*3);
            return this.gestures[rand];
        },
        countdown:function(){
            if(this.count===0){
                clearInterval(this.interv)
                controller.getaiAnswer()
                this.check_answer()
            }
            else if(this.AiScore>=10||this.playerScore>=10){
                this.finalize();
            }
            else{
                this.count--
                controller.getCountdown()
            }
        },
        finalize:function(){
            if(this.playerScore>this.AiScore){
                alert("you win!!!")
            }
            else{
                alert("you lose")
            }
        },
        check_answer:function(){
            var datas = controller.getAnswers()
            var userAnswer = this.getLastIndex(datas[0])
            var aiAnswer = this.getLastIndex(datas[1])
            switch (userAnswer) {
                case "scissors.png":
                    this.check_scissors(aiAnswer);
                    break;
                case "paper.png":
                    this.check_paper(aiAnswer);
                    break;
                case "rock.png":
                    this.check_rock(aiAnswer);
                    break;
                default:
                    break;
            }
            this.count = 4
            this.start()
            controller.displayScore();
        },
        check_scissors:function(aiAnswer){
            if(aiAnswer==="rock.png"){
                this.AiScore++
            }
            else if(aiAnswer==="paper.png"){
                this.playerScore++
            }
        },
        check_paper:function(aiAnswer){
            if(aiAnswer==="scissors.png"){
                this.AiScore++
            }
            else if(aiAnswer==="rock.png"){
                this.playerScore++
            }
        },
        check_rock:function(aiAnswer){
            if(aiAnswer==="paper.png"){
                this.AiScore++
            }
            else if(aiAnswer==="scissors.png"){
                this.playerScore++
            }
        },
        start:function(){
            this.interv=setInterval(function(){
                model.countdown();
            },1000)
        },
        getLastIndex:function(data){
            var data = data.split("/");
            data = data.reverse()
            return data[0];
        }
        
    }

    var controller={
        init : function(){
            view.bindEvent();
        },
        start : function(){
            model.start();
        },
        getaiAnswer:function(){
            view.renderAiAnswer(model.aiAnswer());
        },
        getCountdown:function(){
           view.showCountdown(model.count)
        },
        getAnswers:function(){
            var userAnswer = view.userAnswer();
            var aiAnswer = view.aiAnswer()
            return $arr = [userAnswer,aiAnswer]
        },
        displayScore: function(){
            view.renderScore(model.playerScore,model.AiScore);
        }
    }

    var view={
        renderScore:function(one,two){
            document.querySelector("#uscore").innerHTML=`User Score = ${one}`;
            document.querySelector("#aiscore").innerHTML=`AI score = ${two}`;
        },
        userAnswer: function(){
            return document.querySelector(".content2 img").src
        },
        aiAnswer:function(){
            return document.querySelector(".player2 img").src
        },
        bindEvent: function(){ 
            document.querySelector(".content1").addEventListener("click",view.render)
            document.querySelector(".start").addEventListener("click",controller.start)
        },
        render: function(e){
            document.querySelector(".content2 img").src=e.target.src;
        },
        showCountdown: function(count){
            document.querySelector("#countdown").innerHTML = `start in ${count} second(s)`;
        },
        renderAiAnswer: function(aiAnswer){
            document.querySelector(".player2 img").src = `images/${aiAnswer}`;
        }
    }
    controller.init();
}())