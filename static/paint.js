// 获取 canvas 元素
var ctx = document.getElementById('myChart').getContext('2d');


//关于提示框
const notify = new Notyf({
      duration: 1000,
      position: {
        x: 'center',
        y: 'top',
      },
    });

function get_biao_da_shi(x_d,y_d) {
    var biaodashi = '0'
    x_d.forEach(function(xi, index) {
        let fen_mu = 1;
        var yinshi = ``;
        fen_zi = 1;
        x_d.forEach(function(xj, index2) {
            console.log(`xi:${xi}  xj:${xj}`)
            if (index2 !== index) {
            if (xi === xj) {
            if (flag) {
            flag = false;}
            return null
            }
            fen_mu *= (xi - xj);
            if (xj===0){
            yinshi+=`*x`;
            } else {
            if (xj<0){
            yinshi+=`*(x+${-xj})`
            } else{
            yinshi+=`*(x-${xj})`
            }
            }
        }});




        if (y_d[index]<0 && fen_mu <0)
        { yinzi = `(${-y_d[index]}/${-fen_mu})`
        biaodashi+=`+${yinzi}${yinshi}`
        }
        if (y_d[index]>0 && fen_mu <0)
        { yinzi = `(${y_d[index]}/${-fen_mu})`
        biaodashi+= `-${yinzi}${yinshi}`}
        if (y_d[index]<0 && fen_mu >0)
        { yinzi = `(${-y_d[index]}/${fen_mu})`
        biaodashi+= `-${yinzi}${yinshi}`}
        if (y_d[index]>0 && fen_mu >0)
        { yinzi = `(${y_d[index]}/${fen_mu})`
        biaodashi+= `+${yinzi}${yinshi}`
        }
//        console.log(`yinshi:${yinshi}`)
//        console.log(`${biaodashi}`)
        return biaodashi;

//    console.log(`${biaodashi}`)
        return biaodashi;
    })
    return biaodashi;
}

function get_data() {
        const xValues = document.querySelectorAll('[data-id="13"]');
        const yValues = document.querySelectorAll('[data-id="14"]');
        const x_y = [];
        const x_d = [];
        const y_d = [];

        xValues.forEach((xInput, index) => {
            const x = xInput.value;
            const y = yValues[index].value;
            x_d.push(x);
            y_d.push(y);
            x_y.push([x, y]);
//            console.log(`X 值: ${x}, Y 值: ${y}`);
        });
        return [x_y,x_d,y_d];
}

function make_picture() {
    var [x_y,x_d,y_d] = get_data();
    l_d = [];
    var flag = true;
    function Make_function(x) {
        end = 0;
        x_d.forEach(function(xi, index) {
            let fen_mu = 1;
            function ll(x){
            fen_zi = 1;
            x_d.forEach(function(xj, index2) {
                if (index2 !== index) {
                if (xi === xj) {
                if (flag) {
                notify.error('x坐标重复，请重新输入');
                flag = false;}
                return null
                }
                fen_mu *= (xi - xj);
                fen_zi *= (x - xj);
            }});
            return (y_d[index]*fen_zi/fen_mu);
}
            return end+=ll(x);
        })
        return end;
    }
    //获取函数表达式
    var biaodashi = get_biao_da_shi(x_d,y_d);
    console.log(`函数表达式为：${biaodashi}`)
    // 使用algebra.js解析表达式
    const parsedExpression = algebra.parse(biaodashi);

    // 打印化简后的表达式
    show_str = parsedExpression.toTex();
//    console.log(parsedExpression.toString());

    document.querySelector('[data-id="19"]').textContent = `\\[ ${show_str} \\]`;
    if ('MathJax' in window) {MathJax.typesetPromise();}

    // 定义图表的数据
    var data = {
        labels: [], // 用于存储 x 轴的标签
        datasets: [{
            label: `y`,
            data: [], // 用于存储数据点
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1 // 控制曲线的平滑度
        }]
    };

    // 生成数据点
    for (var i = Math.min(...x_d)-10; i <= Math.max(...x_d)+10; i++) {
        data.labels.push(i);
        n = Make_function(i)
//        console.log(`i:${i}   ;func:${n}`)
        data.datasets[0].data.push(n);
    }
    myChart = Chart.instances[0];
    // 销毁旧的图表实例
    if (myChart) {
        myChart.data = data;
        myChart.update();
    }
    else {
    // 定义图表的配置选项
    var options= {
        responsive: true, // 使图表响应式
        maintainAspectRatio: false, // 禁止保持纵横比
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X Axis'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Y Axis'
                },
                beginAtZero: true
            }
        }
    };
    // 创建新的图表实例
    var myChart = new Chart(ctx, {
        type: 'line', // 使用折线图来绘制函数图像
        data: data,
        options: options
    });
 }}


// 获取具有 data-id="18" 的第一个元素
const button_run = document.querySelector('[data-id="18"]');
button_run.addEventListener('click', function () {
    make_picture();
    MathJax.typeset();
 });

document.addEventListener('DOMContentLoaded', function() {
    make_picture();
    if ('MathJax' in window) {MathJax.typesetPromise();}
})