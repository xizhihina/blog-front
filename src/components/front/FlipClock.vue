/*
 * 翻牌时钟
 * @author： 兔子先生
 * @createDate: 2019-11-24
 */
<template>
  <div class="FlipClock">
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperHour1" />
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperHour2" />
    <em :style="styleVar">:</em>
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperMinute1" />
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperMinute2" />
    <em :style="styleVar">:</em>
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperSecond1" />
    <Flipper :bgcolor="bgcolor" :bgsize="bgsize" ref="flipperSecond2" />
  </div>
</template>

<script lang="ts">
import Flipper from './Flipper.vue'

export default {
  name: 'FlipClock',
  props: {
    bgsize: {
        type: Number,
        default: 180
    },
    bgcolor: {
        type: String,
        default: '#D1CCC0'
    }
  },
  data() {
    return {
      timer: 0,
      flipObjs: []
    }
  },
  components: {
    Flipper
  },
  methods: {
    // 初始化数字
    init() {
      let now = new Date()
      let nowTimeStr = this.formatDate(new Date(now.getTime()), 'hhiiss')
       for (let i = 0; i < this.flipObjs.length; i++) {
         (this.flipObjs[i] as any).setFront(nowTimeStr[i])
       }
    },
    // 开始计时
    run() {
      this.timer = setInterval(() => {
        // 获取当前时间
        let now = new Date()
        let nowTimeStr = this.formatDate(new Date(now.getTime() - 1000), 'hhiiss')
        let nextTimeStr = this.formatDate(now, 'hhiiss')
        for (let i = 0; i < this.flipObjs.length; i++) {
          if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
          }
          (this.flipObjs[i] as any).flipDown(
            nowTimeStr[i],
            nextTimeStr[i]
          )
        }
      }, 1000)
    },
    // 正则格式化日期
    formatDate(date:any, dateFormat:any) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let o:Record<string, any> = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = o[k] + ''
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : this.padLeftZero(str)
          )
        }
      }
      return dateFormat
    },
    // 日期时间补零
    padLeftZero(str:any) {
      return ('00' + str).substr(str.length)
    }
  },
  mounted() {
    this.flipObjs = [
      this.$refs.flipperHour1,
      this.$refs.flipperHour2,
      this.$refs.flipperMinute1,
      this.$refs.flipperMinute2,
      this.$refs.flipperSecond1,
      this.$refs.flipperSecond2
    ] as never
    this.init()
    this.run()
  },
  computed: {
      styleVar() {
          return {
              '--clock-size': this.bgsize + 'px',
              '--clock-bgcolor': this.bgcolor,
              '--length-log2E': ((this.bgsize - 10) / 2) / Math.LOG2E + 'px',
          }
      }
  },
}
</script>

<style>
.FlipClock {
    text-align: center;
}
.FlipClock .M-Flipper {
    margin: 0 3px;
}
.FlipClock em {
    /* display: inline-block; */
    line-height: calc(var(--clock-size)*0.9);
    font-size: calc(var(--clock-size)*0.6);
    font-style: normal;
    vertical-align: top;
    color: var(--clock-bgcolor);
}
</style>