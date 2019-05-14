function zhuce(){
  var span1 = document.querySelectorAll("span")[0]
  var span2 = document.querySelectorAll("span")[1]
  var name = false
  var password = false 
  var nameinput = document.querySelector(".login_name")
  var passwordinput = document.querySelector(".login_password")
  var err = document.querySelector(".passerror")
  function close(){
    var nval = nameinput.value
    var pval = passwordinput.value
    if(!nval){
      span1.style.display ="none"
    }else{
      span1.style.display = "block"
      span1.onclick =function () {
        $(nameinput).prop("value","")
        span1.style.display = "none"
      }
    }
    if (!pval) {
      span2.style.display = "none"
    } else {
      span2.style.display = "block"
      span2.onclick = function () {
        $(passwordinput).prop("value", "")
        span2.style.display = "none"
      }
    }
  }
  nameinput.oninput=function () {
    close()
    var nval = nameinput.value
    var regtel = /^1[34578]\d{9}$/
    var reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,20})$/
    if(regtel.test(nval)){
      err.style.display = "none"
      name = true
      return
    }else{
      err.style.display = "block"
      name = false
    }
    if (reg.test(nval)) {
      err.style.display = "none"
      name = true
      return
    } else {
      err.style.display = "block"
      name = false
    }
  }
  passwordinput.oninput = function () {
    close()
  }
  close()
}
zhuce()