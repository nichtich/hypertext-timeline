$(function() {
  const queryBase = "//query.wikidata.org/"
  const sparqlQueries = {}

  function selectMenu(name) {
    $("#menu li").removeClass("active")
    $("#"+name).addClass("active")

    const query = encodeURIComponent(sparqlQueries[name])
    $("#iframes iframe").hide()
    var iframe = $("#iframe-"+name).show()
    if (!iframe.attr("src")) {
      iframe.attr("src", queryBase + "embed.html#" + query)
    }

    $("#sparql").attr("href", queryBase + "#" + query)
  }

  ;["timeline", "traces", "people"].forEach(function(name, index) {
    var a = $('<a>').addClass("nav-link disabled")
    a.text(name.charAt(0).toUpperCase() + name.slice(1))
    $('<li class="nav-item">').attr('id', name).append(a).appendTo('#menu')

    $.get(name +".sparql", function(sparql) {
      sparqlQueries[name] = sparql

      var iframe = $("<iframe>").hide()
      iframe.attr("id","iframe-"+name)
      iframe.appendTo($("#iframes"))

      a.click(function(){ selectMenu(name) })
      a.removeClass("disabled")

      if(!index) selectMenu(name)
    }, "text")
  })
})
