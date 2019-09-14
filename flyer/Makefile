flyer.pdf: flyer.tex
	xelatex $<

flyer.tex: head.md flyer.md
	pandoc --standalone -t latex $^ | sed 's!tabularnewline!tabularnewline\\hline!g' > $@

flyer.md: ../table.sparql table.js
	npm run --silent wd -- sparql table.sparql | ./table.js > $@

screenshots: about.png people.png timeline.png traces.png
	./screenshot.sh $^
