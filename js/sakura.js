// 优化的花瓣飘落效果
(function() {
    // 配置参数
    const PETALS_COUNT = 10; // 减少花瓣数量
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let petals = [];
    let petalImg = new Image();
    petalImg.src = '/img/huaban.png'; // 使用自定义花瓣图片
    
    // 设置canvas样式
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '100';
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
  
    // 花瓣类
    class Petal {
      constructor() {
        // 从右上角开始
        this.x = Math.random() * width  ; // 右侧区域
        this.y = Math.random() * height * 0.3 - 100; // 顶部上方
        
        // 更均匀的大小分布，减小差值
        this.size = Math.random() * 20 + 9; // 15-40px范围
        
        // 降低下落速度
        this.speed = Math.random() * 0.2 + 0.1; // 0.4-1.2的速度
        
        // 减缓旋转
        this.rotationSpeed = Math.random() * 0.8 - 0.6; // 更小的旋转速度
        this.angle = Math.random() * 360; // 随机初始角度
        this.opacity = Math.random() * 0.4 + 0.7; // 更高的不透明度
        
        // 向左下方向的运动
        this.xSpeed = -(Math.random() * 0.15 + 0.1); // 向左的速度分量
        
        // 极小的摆动
        this.swingFactor = Math.random() * 0.1 + 0.1; // 非常小的摆动幅度
        this.swingSpeed = Math.random() * 0.01 + 0.005; // 非常慢的摆动速度
        this.swingOffset = Math.random() * Math.PI * 2;
      }
  
      update() {
        // 更新花瓣位置和角度
        this.y += this.speed;
        this.x += this.xSpeed; // 主要向左移动
        
        // 添加极小的摆动效果，使运动更自然
        this.x += Math.sin(this.y * this.swingSpeed + this.swingOffset) * this.swingFactor;
        
        this.angle += this.rotationSpeed;
        
        // 当花瓣飘出屏幕时，重置到右上角
        if (this.y > height || this.x < -this.size) {
          this.reset();
        }
      }
      
      reset() {
        // 重置到右上角
        this.x = Math.random() * width * 0.3 + width * 0.7;
        this.y = -this.size - Math.random() * 50;
      }
  
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        
        // 绘制花瓣图片
        ctx.drawImage(
          petalImg, 
          -this.size / 2, 
          -this.size / 2, 
          this.size, 
          this.size
        );
        
        ctx.restore();
      }
    }
  
    // 初始化花瓣
    function initPetals() {
      petals = [];
      for (let i = 0; i < PETALS_COUNT; i++) {
        petals.push(new Petal());
        // 错开初始位置，使花瓣不会同时出现
        petals[i].y = Math.random() * height;
      }
    }
  
    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animate);
    }
  
    // 窗口大小调整
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
  
    // 确保图片加载完成后再启动动画
    petalImg.onload = function() {
      initPetals();
      animate();
    };
  })();