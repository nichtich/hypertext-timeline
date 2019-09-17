SCREENSHOTS=about.png people.png timeline.png traces.png

flyer.pdf: flyer.tex
	xelatex $<

flyer.tex: head.md flyer.md $(SCREENSHOTS) 
	pandoc --standalone -t latex head.md flyer.md | sed 's!tabularnewline!tabularnewline\\hline!g' > $@

flyer.md: ../table.sparql table.js
	npm run --silent wd -- sparql table.sparql | ./table.js > $@

screenshots: $(SCREENSHOTS)

about.png:
	./screenshot.sh about
people.png:
	./screenshot.sh people
traces.png:
	./screenshot.sh traces
timeline.png:
	./screenshot.sh timeline

