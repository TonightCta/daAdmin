<template lang="html">
  <div class="homePage">
    <p>大虎鲸AI智投</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.homePage{
  width: 100%;
  p{
    position: absolute;
    top: 45%;
    left: 53%;
    transform: translate(-50%, -50%);
    padding: 22px 48px;
    background: linear-gradient(to right, #4d4d4d 0, #ffd04b 10%, #4d4d4d 20%);
    background-position: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s infinite linear;
    animation-fill-mode: forwards;
    -webkit-text-size-adjust: none;
    font-weight: 600;
    font-size: 40px;
    text-decoration: none;
    white-space: nowrap;
  }
  @-moz-keyframes shine {
    0% {
      background-position: -10px;
    }
    60% {
      background-position: 280px;
    }
    100% {
      background-position: 280px;
    }
  }
  @-webkit-keyframes shine {
    0% {
      background-position: -10px;
    }
    60% {
      background-position: 280px;
    }
    100% {
      background-position: 280px;
    }
  }
  @-o-keyframes shine {
    0% {
      background-position: -10px;
    }
    60% {
      background-position: 280px;
    }
    100% {
      background-position: 280px;
    }
  }
  @keyframes shine {
    0% {
      background-position: -10px;
    }
    60% {
      background-position: 280px;
    }
    100% {
      background-position: 280px;
    }
  }
}
</style>
