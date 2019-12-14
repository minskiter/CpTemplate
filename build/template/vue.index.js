/**
 * @param prefix
 * @param preFix
 * @param componentname
 * @param ComponentName
 */

module.exports=`<template>
  <div class="{{prefix}}-{{componentname}}">
    {{ComponentName}} TEMPLATE 
  </div>
</template>

<script>
export default {
  name:'{{preFix}}{{ComponentName}}'
}
</script>`