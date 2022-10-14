arr = [{x:100,y:100},{x:100,y:600},{x:600,y:600},{x:600,y:100}]

function lerp(a,b,t){
    return a + (b-a) * t
}

iteration = 2
num = 1200

function generate(){
    arr = [{x:100,y:100},{x:100,y:600},{x:600,y:600},{x:600,y:100}]
for(j=0; j<iteration; j++){
oldarr = arr
arr=[]


for(i=0; i < oldarr.length; i+=4){
    let dist = Math.sqrt(Math.pow(oldarr[i].x - oldarr[i+1].x,2)+Math.pow(oldarr[i].y - oldarr[i+1].y,2))
    let a = Math.atan2(oldarr[i].y - oldarr[i+1].y, oldarr[i].x - oldarr[i+1].x)
    arr.push(oldarr[i])
    arr.push({x:lerp(oldarr[i].x, oldarr[i+3].x, 1/3), y:lerp(oldarr[i].y, oldarr[i+3].y, 1/3)})
    arr.push({x:arr[arr.length-1].x + Math.cos(a+Math.PI)*dist/3, y: arr[arr.length-1].y + Math.sin(a+Math.PI)*dist/3})
    arr.push({x:lerp(oldarr[i].x, oldarr[i+1].x, 1/3), y: lerp(oldarr[i].y, oldarr[i+1].y, 1/3)})
    arr.push({x:lerp(oldarr[i].x, oldarr[i+1].x, (1/3)*2), y: lerp(oldarr[i].y, oldarr[i+1].y, (1/3)*2)})
    arr.push(oldarr[i+1])
    arr.push({x:lerp(oldarr[i+1].x, oldarr[i+2].x, 1/3), y:lerp(oldarr[i+1].y, oldarr[i+2].y, 1/3)})
    arr.push({x:lerp(arr[arr.length-1].x,arr[arr.length-5].x,0.5), y: lerp(arr[arr.length-1].y,arr[arr.length-5].y,0.5)})
    arr.push({x:arr[arr.length-1].x+Math.cos(a+Math.PI/2)*dist/3, y: arr[arr.length-1].y+Math.sin(a+Math.PI/2)*dist/3})
    arr.push({x:lerp(oldarr[i+1].x, oldarr[i+2].x, (1/3)*2), y: lerp(oldarr[i+1].y, oldarr[i+2].y, (1/3)*2)})
    arr.push(oldarr[i+2])
    arr.push({x:lerp(oldarr[i+2].x, oldarr[i+3].x, 1/3), y: lerp(oldarr[i+2].y, oldarr[i+3].y, 1/3)})
    arr[arr.length-4] = {x:lerp(arr[arr.length-1].x,arr[arr.length-5].x,0.5), y: lerp(arr[arr.length-1].y,arr[arr.length-5].y,0.5)}
    arr.push({x:lerp(oldarr[i+2].x, oldarr[i+3].x, (1/3)*2), y: lerp(oldarr[i+2].y, oldarr[i+3].y, (1/3)*2)})
    arr.push({x:lerp(arr[arr.length-1].x,arr[arr.length-11].x,0.5), y: lerp(arr[arr.length-1].y,arr[arr.length-11].y,0.5)})
    arr.push({x:lerp(oldarr[i].x, oldarr[i+3].x, (1/3)*2), y: lerp(oldarr[i].y, oldarr[i+3].y, (1/3)*2)})
    arr.push(oldarr[i+3]) 
}
}

for(i = 0; i < arr.length; i++){
    arr[i].x = Math.round(arr[i].x)
    arr[i].y = Math.round(arr[i].y)
}

let arr2 = arr

let line = 0

let linesize = 5

for(i=0; i < num; i++){
    let newl = false
    for(j = 0 ; j < arr.length; j++){
        if(arr[j].x == i){
            console.log(i)
            arr2[j].x = 100 + linesize*line
            newl = true
        }
    }
    if(newl){
        line++
    }
}

line = 0

// linesize = 400/(4*iteration)

for(i=0; i < num; i++){
    let newl = false
    for(j = 0 ; j < arr.length; j++){
        if(arr[j].y == i){
            //console.log(i)
            arr2[j].y = 100 + linesize*line
            newl = true
        }
    }
    if(newl){
        line++
    }
}
arr = arr2
}


timer = 0
generate()
function draw(){
    // context.fillStyle = 'red'
    for(i=0; i<arr.length-1; i++){
        context.strokeStyle = `rgb(${i/arr.length*255},0,${255-i/arr.length*255})`
        drawLine(arr[i].x,arr[i].y,arr[i+1].x,arr[i+1].y)
        // context.fillRect(arr[i].x, arr[i].y, 2,2)
    }
}
function update(){
    timer++
if(timer > 30 && isKeyPressed[87]){
    timer = 0
iteration++
generate()
}
if(timer > 30 && isKeyPressed[83]){
    timer = 0
iteration--
generate()
}
}

// function keyup(key){
//     console.log(key)
// }