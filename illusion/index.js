const width = 1000
const height = 500

const sinusFactor = 0.8
const horizontalBars = 15
const strokeWidth = 1

var rect = [0, 0, 0, 0, 0, 0, 0, 0]

d3.select("#slider").on("input", () => {
    update(d3.select("#slider").node().value)
})

function update(x) {
    rect.forEach((element, i) => {
        rect[i] = Math.sin(i * sinusFactor)*x
    })
    console.log(x)
    console.log(rect)
    canvas.selectAll("g").remove()
    updateVis()
}

const canvas = d3.select("#canvas")

for (var i = 1; i < rect.length * 3; i++) {
    canvas.append("line")
        .attr("stroke", "black")
        .attr("x1", 0)
        .attr("y1", height / (rect.length * 3) * i)
        .attr("x2", width)
        .attr("y2", height / (rect.length * 3) * i)
}

function updateVis() {
    var rectGroups = canvas.selectAll("g")
        .data(rect)
        .enter().append("g")

    for (var j = 0; j <= horizontalBars; j++) {
        rectGroups.append("rect")
            .attr("x", d => {
                return d + width / horizontalBars * j
            })
            .attr("y", (d, i) => height / 3 / rect.length * i)
            .attr("width", width / horizontalBars / 2)
            .attr("height", height / 3 / rect.length)
            .attr("fill", "black")

        rectGroups.append("rect")
            .attr("x", d => {
                return d + width / horizontalBars * j
            })
            .attr("y", (d, i) => height / 3 / rect.length * i + height / 3)
            .attr("width", width / horizontalBars / 2)
            .attr("height", height / 3 / rect.length)
            .attr("fill", "black")

        rectGroups.append("rect")
            .attr("x", d => {
                return d + width / horizontalBars * j
            })
            .attr("y", (d, i) => height / 3 / rect.length * i + height / 3 * 2)
            .attr("width", width / horizontalBars / 2)
            .attr("height", height / 3 / rect.length)
            .attr("fill", "black")
    }
}
updateVis()

