<template>
    <div class="main">
        <img src="../../assets/images/welcome.jpg" alt="" class="welcomepic">
    </div>
</template>

<script>
export default {
  created () {
    this.$ajax.get('articles').then(res => { console.log(res.data) })
  }
}
</script>

<style scoped lang='less'>
.main {
    .welcomepic{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
}

</style>
