(function () {
    $(window).load(function(){
        setTimeout( hideLoader , 1000)
    });

    function hideLoader() {
      console.log('file');
        $('#loader-container').fadeOut("slow")
    }
})();
