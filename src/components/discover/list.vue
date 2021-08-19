<template>
  <div>
    <div id="top-body">
      <nav class="nav-bar">
        <van-icon name="arrow-left"
                  class="return-arrow" />
        <div>歌 单</div>
        <van-icon name="bullhorn-o"
                  class="right-icon" />
      </nav>
      <div class="information">
        <img class="list-image"
             src="../../assets/music.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.return-arrow {
  color: black;
  display: inline-block;
  position: absolute;
  left: 0.5em;
  top: 0.22em;
}
.right-icon {
  color: black;
  display: inline-block;
  position: absolute;
  right: 0.5em;
  top: 0.22em;
}
.nav-bar {
  height: 10%;
  background-color: red;
  width: 100%;
  text-align: center;
  font-size: 1.17em;
}
.information {
  padding: 2em 0 0 0;
}
.list-image {
  width: 8em;
  height: 8em;
}
</style>