<template>
  <footer class="footer-wrapper">
    <div class="footer1">
      <ul>
        <li ><a href="http://www.gov.cn/" >中国政府网</a></li>
        <li> | </li>
        <li><a href="http://www.seac.gov.cn/" >国家民族事务委员会</a></li>
        <li> | </li>
        <li><a href="http://www.moe.gov.cn/" >教育部</a></li>
        <li> | </li>
        <li><a href="http://www.sc.gov.cn/" >四川省人民政府</a></li>
        <li> | </li>
        <li><a href="http://www.chengdu.gov.cn/" >成都市人民政府</a></li>
        <li> | </li>
        <li><a href="http://www.scedu.net/" >四川省教育厅</a></li>
      </ul>
    </div>
    <div class="footer2">
      <p>武侯校区地址：四川省成都市一环路南四段16号(610041)    航空港校区地址：双流区航空港开发区大件路文星段168号(610225)</p>
      <p>西南民族大学版权所有      蜀ICP备11019012号</p>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
  };

</script>

<style>
  .footer-wrapper{
    height: 160px;
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    background: #000;
    color:#fff;
  }
  .footer-wrapper>.footer1{
    background: url('../../../static/img/footbg.jpg');
    height: 100px;
    width: 100%;
    min-width: 960px;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .footer-wrapper>.footer2 {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 960px;
    width: 100%;
    background-color: #30363c;
    height: 60px;
    color: #4d6a8d;
    font-size: 12px;
    flex-direction:column;
  }
  .footer-wrapper>.footer1>ul>li {
    float: left;
    padding: 0 2px;
    color: #ffffff;
  }
  .footer-wrapper>.footer1>ul>li>a {
    font-size: 14px;
    color: #ffffff;
  }
</style>
