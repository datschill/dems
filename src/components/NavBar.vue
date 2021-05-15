<template>
    <div class="nav">
        <!-- <input type="checkbox" id="nav-check"> -->
        <div class="nav-header">
            <div class="nav-title">
             {{ title }}
            </div>
        </div>
        <!-- <div class="nav-btn">
            <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
            </label>
        </div> -->
        
        <div class="nav-right">
            <slot class="nav-temp">
            </slot>
        </div>
        <!-- <div class="nav-links">
            <slot class="nav-links">
            </slot>
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style>
.nav {
  height: 50px;
  width: 100%;
  background-color: #1e272e;
  position: relative;
  color: white;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  border-width: 0 0 2px 0;
  border-color: #7158e2;
  border-style: solid;
}

.nav > div {
  display: grid;
  padding: 10px;
}

.nav > div > * {
  margin: auto;
}

.nav-title {
  font-weight: 600;
}

/* .nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav-right {
  display: flex;
}




.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
}

.nav > .nav-links > a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
} */
</style>