function lunbo() {
      var uindex = 0
      function lunbo1() {
        var $dian = $(".lunbonum_li")
        var $lis = $(".lunbo_li")
        var $lisl = $lis.length
        for (let i = 0; i < $lis.length; i++) {
          $lis.eq(i).css({position : "absolute", left: i * 1200})
        }

        function movse(index) {
          var index = index
          console.log(index)
          var $ul = $(".lunbo_ul")
          $ul.mouseover(function () {
            stop()
          })
          $ul.mouseout(function () {
            autoplay()
          })
          if (index === $lisl) {
            $ul.css({
              left: 0,
              transition: "none"
            })
            setTimeout(() => {
              index = uindex = 1
              $ul.css({
                left: (-index * 1200),
                transition: "all .5s"
              })
              $dian.removeClass()
              $dian.eq(index).addClass("focus")
            }, 15)
            return;
          }
          if (index < 0) {
            $ul.css({
              left: -($lisl - 1) * 1200,
              transition: "none"
            })
            setTimeout(() => {
              $dian.removeClass()
              $dian.eq(uindex).addClass("focus")
              index = uindex = ($lisl - 2)
              $ul.css({
                left: (-index * 1200),
                transition: "all .5s"
              })
            }, 10);
            return
          }
          $ul.css({
            left: (-index * 1200),
            transition: "all .5s"
          })
          if (index === 7) {
            $dian.removeClass()
            $dian.eq(0).addClass("focus")
            return
          }
          $dian.removeClass()
          $dian.eq(index).addClass("focus")
        }
        $dian.mousemove(function () {
          uindex = $(this).index()
          movse(uindex)
        })
        var id 
        function autoplay(){
          clearInterval(id)
          id= setInterval(() => {
            next()
          }, 2000);
        }
        autoplay()
        function stop() {
          clearInterval(id)
        }
        function next() {
          uindex++
          movse(uindex)
        }
        function prep() {
          uindex--
          movse(uindex)
        }
      }
      lunbo1()
};
lunbo();