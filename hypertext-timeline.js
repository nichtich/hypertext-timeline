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

  ;["timeline", "traces"].forEach(function(name, index) {
    $.get(name +".sparql", function(sparql) {
      sparqlQueries[name] = sparql

      var iframe = $("<iframe>").hide()
      iframe.attr("id","iframe-"+name)
      iframe.appendTo($("#iframes"))

      var a = $('<a class="nav-link">').text(name.charAt(0).toUpperCase() + name.slice(1))
      a.click(function(){ selectMenu(name) })
      $('<li class="nav-item">').attr('id', name).append(a).appendTo('#menu')

      if(!index) selectMenu(name)
    }, "text")
  })
})
