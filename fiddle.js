/*
 * Author:SaurabhMhatre
 *
 *
 *Intial variables
 * characterarray: array containing all characters of button
 * timer: timer to initialize counter
 * diftolerance: time limit until which input can change
 * startTime ,endtime: timelimits for checking difftolerance
 * activekey:array to keep track of active key pressed
 * current:current character of active key
 * lastKey: lastkey pressed by user
 * longpress:to check if long press in done by user
*/

var characterarray = [];
characterarray.push(
[],[1,".",",","!"],[2,"a","b","c"],[3,"d","e","f"],[4,"g","h","i"],
[5,"j","k","l"],[6,"m","n","o"],[7,"p","q","r","s"],[8,"t","u","v"],
[9,"w","x","y","z"],["*"],["0"],["#"]
);
var timer;
var pause = 0;
var difTolerance = 800;
var startTime;
var endTime;
var first = true;
var activeKey;
var current;
var lastKey = 0;
var longpress = 0;
var Keyboard = React.createClass({
	/*
  *Initailly the results in both inputs are blank
  */
  getInitialState: function() {
    return {
    finalresult:"",
    tempresult:""
    };
  },

 /**
 Function to check if buttons are not pressed rapidly and it is okay to set text in input
 Parameters:0
 */
 checkKey:function(){
  var self = this;
  endTime = new Date().getTime();
  if (endTime - startTime >= difTolerance ) {
		 clearInterval(timer);
     var result = this.state.finalresult;
     // console.log("longpress value",longpress);
     if(longpress != 1){
       if(current>0){
         result +=  activeKey[current-1];
       }
       else{
           result += activeKey[current];
       }
     }
   	current = 0;
     self.setState({
       finalresult:result,
			 tempresult:""
     });
	}
  },
	/*
	*function to handle key presses
	*/
  handleClick(value){
    var self= this;
    // var valueint = value.parseInt();
    activeKey = characterarray[value];
    if (value != lastKey) {
			current = 0;
			first = true;
		}
		lastKey = value;
		clearInterval(timer);
		startTime = new Date().getTime();
		pause = 0;
		 timer = setInterval(() => this.checkKey(), 5);
     if (current <= activeKey.length-1) {
       self.setState({tempresult:activeKey[current]});
       ++current;
  	}else{
  		current = 0;
      self.setState({tempresult:activeKey[current]});
  	}
  	if (first) {
  		current = 0;
  		first = false;
  	}
  },
	/*
	function to handle long key presses
	*/
  componentDidMount:function(){
    var self =this;
    var mouseDownTime;
    var threshold = 1000; // 1000 milliseconds == 1 second
    for(var i = 1;i<=12;i++){
      var id = "#"+i;
      $("#phone").find(id).mousedown(function(event){
          var mouseDownDate = new Date();
          mouseDownTime = mouseDownDate.getTime();
      });
      $("#phone").find(id).mouseup(function(event){
          var mouseUpDate = new Date();
          var mouseUpTime = mouseUpDate.getTime();
          if(mouseUpTime - mouseDownTime > threshold){
              // Code you want called after being triggered.
              var activeKey = characterarray[1];
              var result = self.state.finalresult;
                  result +=  activeKey[0];
              self.setState({
                finalresult:result,
              });
              longpress = 1;
          }
          else{
            longpress = 0;
          }
      });
    }
  },
	/*
 HTML markup of the table
	*/
  render: function() {
  var self=this;
    return (
    <table id="phone">
    <tbody>
    <tr>
        <td colSpan="3">
            <input type="text" id="result" value={this.state.finalresult}/>
                <input type="text" id="result" value={this.state.tempresult}/>
        </td>
    </tr>
    <tr>
        <td>
            <button id="1" className="key" onClick={() => this.handleClick("1")}>1
                <span>. , !</span>
            </button>
        </td>
        <td>
            <button id="2" className="key" onClick={() => this.handleClick("2")}>2
                <span>a b c</span>
            </button>
        </td>
        <td>
            <button id="3" className="key" onClick={() => this.handleClick("3")}>3
                <span>d e f</span>
            </button>
        </td>
    </tr>
    <tr>
        <td>
            <button id="4" className="key" onClick={() => this.handleClick("4")}>4
                <span>g h i</span>
            </button>
        </td>
        <td>
            <button id="5" className="key" onClick={() => this.handleClick("5")}>5
                <span>j k l</span>
            </button>
        </td>
        <td>
            <button id="6" className="key" onClick={() => this.handleClick("6")}>6
                <span>m n o</span>
            </button>
        </td>
    </tr>
    <tr>
        <td><button id="7" className="key" onClick={() => this.handleClick("7")}>7
            <span>p q r s</span>
            </button>
        </td>
        <td>
            <button id="8" className="key" onClick={() => this.handleClick("8")}>8
                <span>t u v</span>
            </button>
        </td>
        <td>
            <button id="9" className="key" onClick={() => this.handleClick("9")}>9
                <span>w x y z</span>
            </button>
        </td>
    </tr>
    <tr>
        <td><button id="10" className="key" onClick={() => this.handleClick("10")}>*</button></td>
        <td><button id="11" className="key" onClick={() => this.handleClick("11")}>0</button></td>
        <td><button id="12" className="key" onClick={() => this.handleClick("12")}>#</button></td>
    </tr>
    </tbody>
		</table>
);
  }
});

ReactDOM.render(
  <Keyboard/>,
  document.getElementById('container')
);
