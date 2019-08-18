$(function() {
  const queryBase = "//query.wikidata.org/"
  const menu = {
    "timeline": { sparql: null },
    "traces": { sparql: null },
    "people": { sparql: null }
  }
  var selectedMenuItem

  function selectMenu(name) {
    selectedMenuItem = name

    $("#menu li").removeClass("active")
    $("#"+name).addClass("active")

    const query = encodeURIComponent(menu[name].sparql)
    $("#description").html(menu[name].html)
    $("#iframes iframe").hide()
    var iframe = $("#iframe-"+name).show()
    if (!iframe.attr("src")) {
      iframe.attr("src", queryBase + "embed.html#" + query)
    }

    $("#sparql").attr("href", queryBase + "#" + query)
  }

  Object.keys(menu).forEach(function(name) {
    var a = $('<a>').addClass("nav-link disabled")
    a.text(name.charAt(0).toUpperCase() + name.slice(1))
    $('<li class="nav-item">').attr('id', name).append(a).appendTo('#menu')

    if ('sparql' in menu[name]) {
      $.get(name +".sparql", function(sparql) {
        menu[name].sparql = sparql

        var iframe = $("<iframe>").hide()
        iframe.attr("id","iframe-"+name)
        iframe.appendTo($("#iframes"))

        a.click(function(){ selectMenu(name) })
        a.removeClass("disabled")

        if (name == 'timeline') {
          selectMenu(name)
        }
      }, "text")
    }
    $.get(name + ".html").done(function(html) {
      menu[name].html = html
      if (name == 'timeline') {
        $("#description").html(html)
      }
    })
  })
})
