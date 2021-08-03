<template>
  <div class="nav-bar">

    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
 .nav-bar{
   height: 44px;
   line-height: 44px;
   text-align: center;
   background-color: var(--color-tint);
   display: flex;
   position: relative;

   z-index: 9;
  
 }
 .left, .right{
   width: 60px;
 }
 .middle {
   flex: 1;
   color: #fff;
 }

</style>