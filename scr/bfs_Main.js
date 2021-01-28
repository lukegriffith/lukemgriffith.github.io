
var grid = document.getElementById("grid");



var Stack = function(){
    this.items = [];
}
Stack.prototype.isEmpty = function(){
    return this.items.length == 0;
}
Stack.prototype.pop = function() {
    return  this.items.pop();

}
Stack.prototype.push = function(obj) {
    this.items.push(obj);
}




var CellClickEvent = function(){

    if (this.className.includes("dead")){
        throw 'Dead cell. Cant go here.'
    }

    var stack = new Stack();

    var pathInfo = bfs(AdjList, source);

    for (var i = 0; i < AdjList.length; i++) {
         console.log("vertex " + i + ": distance = " +   pathInfo[i].distance + ", predecessor = " + pathInfo[i].predecessor);
     }

    var v = pathInfo[this.id];

    while (v.predecessor != null) {

        stack.push(v.predecessor);
        v = pathInfo[v.predecessor];
    }



    cells = grid.children; 


    var path = document.getElementsByClassName("path");


    // This is needed, because as we change the class of the items, the path list decreases.
    var pathArrLength = path.length;

    for (var i = 0; i < pathArrLength; i++){

        var cell = path[0];

        cell.className = "cell";
    }

    var sourceCell = grid.children[source]
    sourceCell.className = "cell";

    source = Number(this.id);

    grid.children[source].className = "cell active";



    while (!stack.isEmpty()){
        var i = stack.pop();
        var cell = cells[i];

        cell.className = "cell path";
    }

}


for (var i = 0; i < grid.children.length; i++) {
    grid.children[i].onclick = CellClickEvent;
}