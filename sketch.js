//Version 0.1 created by RaGon 29.12.18
//DFA that test if a word is in a language or not


var network ;
// create an array with nodes
var nodes = new vis.DataSet();

// create an array with edges
var edges = new vis.DataSet();

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

//setting the options for the graph display
const options = {
    manipulation: {
        addNode: false,
        deleteNode: true,
        addEdge: false,
    },
    nodes: {
      font: {
        size: 22
      },
      borderWidth: 3
      
    },
    edges: {
      font: {
        align: "top"
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" }
      }
    },
    
   
    };
var addEdge;
var edgeInput;
var edgeInput2;
var edgeInput3;
var edgeSpan0;
var edgeSpan1;
var edgeSpan2;
var edgeSpan3;
var test = 0;
var alphabet = {};
var setAlphabet;
var addNode;
var addNodeFinal;
var word;
var wordButton;
var resetGraph;
var giti;
var divi;
var message;
function setup(){
    noCanvas();
    network = new vis.Network(container, data, options);
    createInterface();
}

//adding Edges
function addEdge1(){
    edges.add({id: edgeInput.value() + '_' + edgeInput2.value(),from: edgeInput.value(), to: edgeInput2.value(), label: edgeInput3.value()})
}

//adding Nodes
function addNode1(){
    if (nodes.length === 0) nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1), color:{border: "green"}})
    else nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1)})
    edgeInput.option(nodes.length)
    edgeInput2.option(nodes.length)
}

//setting the alphabet array and listing the edge possibilities with combinations()
function setAlph(){
    alphabet = split(edgeInput0.value(),',');
   // console.log(alphabet); 
    var s = [];
     for(let  i = 0; i <alphabet.length; i++){
         s +=alphabet[i];

    }
    var d = combinations(s);
    for (let i = 0; i <pow(2, alphabet.length)-1;i++){
        edgeInput3.option(d[i]);
        console.log(d[i]);
    }
    console.log(s);
    
}

//adding the final Node
function addNodeF(){
    nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1), color: {border: "red"}})
    edgeInput.option(nodes.length)
    edgeInput2.option(nodes.length)
}


//Creates a graph for testing
function testingStuff(){
    edges.add({id: "1_2", from: 1, to: 2, label: "a"})
    edges.add({id: "1_3", from: 1, to: 3, label: "b"})
    edges.add({id: "3_3", from: 3, to: 3, label: "a_b"})
    edges.add({id: "4_3", from: 4, to: 3, label: "a"})
    edges.add({id: "4_4", from: 4, to: 4, label: "b"})
    edges.add({id: "2_2", from: 2, to: 2, label: "a"})
    edges.add({id: "2_1", from: 2, to: 1, label: "b"})
    nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1), color:{border: "green"}})
    nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1)})
    nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1), color: {border: "red"}})
    //nodes.add({id: nodes.length+1, label: 'q' + (nodes.length+1)})

}


//gets edges of Node with ID s
function getEdgesOf(s){
    var arr = {};
    var j = 1;

    for(let i = 0; i<nodes.length+1;i++){
        if(edges.get('' + s + '_' + i) != null){
        arr[j] = (edges.get('' + s + '_' + i));
        j++;}
    }
    arr[0] = j-1;

    return arr;

}

//checks if a word is in the Language of the automata
function testWord(){
    var testWord = word.value();
    var s  = getEdgesOf(1);
    var currentNode = 1;
    //first loop goes through every letter of the word
    for(let i = 0; i<testWord.length; i++){
        var arrSize = getEdgesOf(currentNode)[0];
        //second loop checks the edge of the current node and if it contains the letter
        for(let j = 1; j<=arrSize; j++){
        b = testWord[i];
        //Checking all possibilites
        console.log(getEdgesOf(currentNode)[j].label);
        if(getEdgesOf(currentNode)[j].label.includes(b)) {
            
            console.log(getEdgesOf(currentNode)[j].to)
            currentNode = getEdgesOf(currentNode)[j].to;
            j =arrSize+1;
        }
       
    }
    }
    //checking if we are in final state after going through the word
    if (nodes.get(currentNode).color != undefined && nodes.get(currentNode).color.border === "red"){
        message.html('The Word: "' + word.value()+  '" is in the Language')
        console.log(true);
    }

     
    else{
        message.html('The Word: "' + word.value()+  '" is not in the Language')
        console.log("false")
    } 

}

//giving us all possible edge combinations
function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}


//Creates the User Interface
function createInterface(){
    
    edgeSpan0 = createSpan('Alphabet:  ')
    edgeInput0 = createInput('a,b,c');
    setAlphabet = createButton('Set')
    setAlphabet.mousePressed(setAlph)
    edgeSpan1 = createSpan('  add Edge:  From: ');
    edgeInput = createSelect();
    edgeInput.size('30','AUTO')
    edgeSpan2 = createSpan(' To: ');
    edgeInput2 = createSelect();
    edgeInput2.size('30','AUTO')
    edgeSpan3 = createSpan(' When: ');
    edgeInput3 = createSelect();
    edgeInput3.size('50','AUTO');

    addEdge = createButton('addEdge');
    addEdge.mousePressed(addEdge1);
    addNode = createButton('add Node')
    addNode.mousePressed(addNode1);
    addNodeFinal = createButton('add final Node')
    addNodeFinal.mousePressed(addNodeF);
    word = createInput('baaa');
    wordButton = createButton('Test');
    wordButton.mousePressed(testWord);
    message = createDiv('')
    divi = createDiv('Welcome to my little DFA App. The green node shows the starting point. First set an Alphabet, each letter seperated by a comma. Then add Nodes and Edges. Each Edge has a starting and end point and some information about the transition function. Do not create two Edges between the same node! Test words with the second text input. For more Information visit my github!')
    giti = createA('https://github.com/RagonEbker', 'Github')

}