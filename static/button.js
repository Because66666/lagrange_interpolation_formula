const button_add = document.querySelector('[data-id="16"]');
var num = 3;
// 假设这些按钮都在一个共同的父元素内
var container = document.querySelector('[data-id="11_2"]'); // 这里需要替换成实际的容器选择器

container.addEventListener('click', function(event) {
    var target = event.target;
    if (target.matches('[data-id="15"]')) { // 检查是否点击的是目标元素
        var parentElement = target.parentElement;
        if (parentElement && parentElement instanceof HTMLElement) {
            parentElement.remove();
        }
    }
});

button_add.addEventListener('click', function (event){
    // 获取目标容器
    const container = document.querySelector('[data-id="11_2"]');

    // 创建新的div元素
    const newDiv = document.createElement('div');
    newDiv.className = 'flex items-center space-x-2';
    newDiv.setAttribute('data-id', '12');

    // 创建第一个input元素
    const inputX = document.createElement('input');
    inputX.className = 'flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/3';
    inputX.setAttribute('placeholder', 'X 值');
    inputX.setAttribute('data-id', '13');
    inputX.setAttribute('type', 'text');
    inputX.value = num.toString();
    num+=1;

    // 创建第二个input元素
    const inputY = document.createElement('input');
    inputY.className = 'flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-1/3';
    inputY.setAttribute('placeholder', 'Y 值');
    inputY.setAttribute('data-id', '14');
    inputY.setAttribute('type', 'text');
    inputY.value = '4';

    // 创建button元素
    const button = document.createElement('button');
    button.className = 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3 w-1/3';
    button.setAttribute('data-id', '15');
    button.textContent = '删除';

    // 将元素添加到div中
    newDiv.appendChild(inputX);
    newDiv.appendChild(inputY);
    newDiv.appendChild(button);

    // 将div添加到容器中
    container.appendChild(newDiv);
})

