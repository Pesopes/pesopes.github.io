# Mindustry compiler v js

Na začátek bych možná měl říct že to vlastně není compiler ale transpiler, ale to není tak zajímavý název...

## Mindustry
je výborná hra zadarmo a dokonce open source (ale Java😑).
O hře samotné vlastně není důležité mluvit, je to tower defense a factory building hra, pokud ten žánr existuje.
To co já budu vytvářet je kód pro mikroprocesor ve hře, který může ovládat jednotky a nebo třeba ukazovat hodiny.
(Obrázek hodin které jsem vytvořil)

## MASM
Nevím, jak oficiální je název jazyka Mindustry assembly, ale vystihuje výborně jazyk.
Podmínky, funkce, loopy jsou tvořeny jump příkazem a nebo přímo měněním counter programu.

## Úkol
Vytvořit jazyk podobný c, který převedou do MASM.

## Moje cesta do zbláznéní
### C#
Viděl jsem velmi zajímavé video od [Sebastiana Laguea](https://www.youtube.com/c/SebastianLague),
kde vytvořil v unity hru o programování nějaké turrety.
Jen kvůli tomu vytvořil celý jazyk v c# v unity.
Takže to nemůže být tak těžké, že ne...

Zapnul jsem visual studio, nový projekt a začal jsem vytvářet hezký urovnaný systém s classama a tak.
Po pár dnech jsem si uvědomil, že nemám vůbec žádný tušení, co dělám.
Pak jsem začal dělat něco jinýho a zapomněl jsem, že tenhle projekt existuje.

### JS
Nedávno mě napadlo znovu otevřít projekt. Přece musím taky něco dokončit.
Teď už jsem se ale poučil (alespoň trochu) a začal jsem nejdřív hledat na internetu, co mám dohaje dělat.
Většinou jsem skončil u něčeho zvaného abstract syntax tree (AST).
Pak jsem našel [článek](https://jotadeveloper.medium.com/abstract-syntax-trees-on-javascript-534e33361fc7), kde někdo použil javascript a knihovnu esprima na měnění JavaScript kódu na AST.


Zase jsem začal od znova teď s výhodou AST.
[Github link](https://github.com/Pesopes/Mindustry_compiler)