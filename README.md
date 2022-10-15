# TIMELINE
home
  hero
    [] itens em alta *1
  em alta
    [] itens em alta *1

---
perfil/anuncios *criar
  [x] listar anuncios
  [x] botão para ir criar anuncio

perfil/favoritos
  [] fetch

perfil/ultimos-vistos
  [] fetch

---
itens
  [] itens em alta *1

itens/[categories]
  [] filtros
  [] buscador

itens/detalhes
  [x] fetch
  [] mark as view
  é meu item?
    true:
      [] deletar anuncio
      ...outras features
    false:
      [] contact

# CHORES
home
  vender
  [] botão link
  [] categorias carrousel

# FIXES
attributes
  real-estates
    - km2 -> m2

excessive fetching categories and items

# FEATURES
vender
- formatar attributos
- format, ex: 8 Cilindros, 16 km => Cilindros, km

attributes
  car
  - (ADD) fuel type (flex, hibrido)
  - car type (sedan, suv)
  - color
  - interior color

optimize firebase storage
