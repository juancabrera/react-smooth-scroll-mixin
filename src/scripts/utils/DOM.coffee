# Utillity helper for trimming unnecessary props from
# React.DOM imports.
# Extracted from https://github.com/atom/reactionary/

{DOM} = React

for tagName of DOM
   do (tagName) => module.exports[tagName] = (args...) -> tag(tagName, args...)

tag = (name, args...) ->
   if args[0]?.constructor is Object
      attributes = args.shift()
   else
      attributes = {}

   if attributes.hasOwnProperty('class')
      attributes.className = attributes.class
      delete attributes.class

   DOM[name](attributes, args...)