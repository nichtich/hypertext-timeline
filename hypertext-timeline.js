$(function() {
  const queryBase = "//query.wikidata.org/"
  const githubBase = "//github.com/nichtich/hypertext-timeline/blob/master/"

  const menu = {
    "table": { sparql: null, html: null },
    "timeline": { sparql: null, html: null },
    "traces": { sparql: null, html: null },
    "wikis": { sparql: null, html: null },
    "people": { sparql: null, html: null },
    "about": { html: null }
  }
  var selectedMenuItem = window.location.hash.substr(1)
  if (!(selectedMenuItem in menu)) {
    selectedMenuItem = "table"
  }

  function selectMenu(name) {
    const item = menu[name]
    selectedMenuItem = name

    $("#menu li").removeClass("active")
    $("#"+name).addClass("active")

    if (item.html) {
      $("#description").show().html(item.html)
      $("#html").attr("href", githubBase + name + ".html").show()
    } else {
      $("#description").hide()
      $("#html").hide()
    }

    $("#iframes iframe").hide()
    $("#sparql").hide()
    if (item.sparql) { 
      const query = encodeURIComponent(item.sparql)
      var iframe = $("#iframe-"+name).show()
      if (!iframe.attr("src")) {
        iframe.attr("src", queryBase + "embed.html#" + query)
      }
      $("#sparql").attr("href", queryBase + "#" + query).show()
    }

    window.location.hash = name
  }

  Object.keys(menu).forEach(function(name) {
    const item = menu[name]

    var a = $('<a>').addClass("nav-link disabled")
    a.text(name.charAt(0).toUpperCase() + name.slice(1))
    $('<li class="nav-item">').attr('id', name).append(a).appendTo('#menu')
    a.click(function(){ selectMenu(name) })

    if ('sparql' in item) {
      $.get(name +".sparql", function(sparql) {
        item.sparql = sparql

        var iframe = $("<iframe>").hide()
        iframe.attr("id","iframe-"+name)
        iframe.appendTo($("#iframes"))
        a.removeClass("disabled")

        if (name == selectedMenuItem) {
          selectMenu(name)
        }
      }, "text")
    }
    if ('html' in item) {
      $.get(name + ".html").done(function(html) {
        item.html = html
        if (name == selectedMenuItem) {
          selectMenu(name)
        }
        a.removeClass("disabled")
      })
    }
  })
})
