const width = 1000
const height = 500

const sinusFactor = 0.8
const horizontalBars = 15
const strokeWidth = 1

const canvas = d3.select("#canvas")

//array for x offset of the 8 rectangles
var rect = [0, 0, 0, 0, 0, 0, 0, 0]

//setting slider value to initial zero,
//adding listener to the sliders
d3.select("#slider").node().value = 0
d3.select("#slider").on("input", () => {
    update(d3.select("#slider").node().value)
})

//applying x sinus offset according to slider value
function update(factor) {
    for(i = 0; i<rect.length;i++){
        rect[i] = Math.sin(i * sinusFactor) * factor
    }
    updateVis()
}

//creating the horizontal lines
for (var i = 1; i < rect.length * 3; i++) {
    canvas.append("line")
        .attr("stroke", "black")
        .attr("x1", 0)
        .attr("y1", height / (rect.length * 3) * i)
        .attr("x2", width)
        .attr("y2", height / (rect.length * 3) * i)
}

//updating the rectangles x positions
function updateVis() {
    canvas.selectAll("g").remove()
    var rectGroups = canvas.selectAll("g")
        .data(rect)
        
    var enteredGroups = rectGroups.enter().append("g")

    for (var j = 0; j <= horizontalBars; j++) {
        for (var k = 0; k < 3; k++) {
            enteredGroups.append("rect")
                .attr("x", d => {
                    return d + width / horizontalBars * j
                })
                .attr("y", (d, i) => height / 3 / rect.length * i + (height/3)*k)
                .attr("width", width / horizontalBars / 2)
                .attr("height", height / 3 / rect.length)
                .attr("fill", "black")
        }
    }
}
updateVis()