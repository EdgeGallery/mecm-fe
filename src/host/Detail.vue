<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div class="detail">
    <div class="chartPie">
      <div class="chart">
        <div class="chartTitle">
          Sync
        </div>
        <ve-pie
          :extend="chartExtend"
          :settings="chartSettings"
          :data="chartData"
        />
      </div>
      <div class="chart">
        <div class="chartTitle">
          Situation
        </div>
        <ve-pie
          :extend="chartExtend"
          :settings="chartSettings"
          :data="chartData"
        />
      </div>
      <div class="chart">
        <div class="chartTitle">
          Status
        </div>
        <ve-pie
          :extend="chartExtend"
          :settings="chartSettings"
          :data="chartData"
        />
      </div>
    </div>
    <div class="chartChina chart">
      <div class="chartTitle">
        Distribution
      </div>
      <ve-heatmap
        :data="chartData4"
        :settings="chartSettings1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': 'Synced', '访问用户': 1393 },
          { '日期': 'Not synchronized', '访问用户': 156 },
          { '日期': 'creating', '访问用户': 893 },
          { '日期': 'instuction', '访问用户': 530 }
        ]
      },
      chartData4: {
        columns: ['lat', 'lng', '人数'],
        rows: [
          { 'lat': 115.892151, 'lng': 28.676493, '人数': 1000 },
          { 'lat': 117.000923, 'lng': 36.675807, '人数': 400 },
          { 'lat': 113.665412, 'lng': 34.757975, '人数': 800 },
          { 'lat': 114.298572, 'lng': 30.584355, '人数': 200 },
          { 'lat': 112.982279, 'lng': 28.19409, '人数': 100 },
          { 'lat': 113.280637, 'lng': 23.125178, '人数': 300 },
          { 'lat': 110.33119, 'lng': 20.031971, '人数': 800 },
          { 'lat': 104.065735, 'lng': 30.659462, '人数': 700 },
          { 'lat': 108.948024, 'lng': 34.263161, '人数': 300 },
          { 'lat': 103.823557, 'lng': 36.058039, '人数': 500 }
        ]
      },
      chartSettings: {
        radius: 100,
        offsetY: 140
      },
      chartSettings1: {
        position: 'world',
        type: 'map',
        geo: {
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        }
      },
      chartExtend: {
        color: ['#19d4ae', '#fa6e86', '#5ab1ef', '#ffb980'],
        legend: {
          bottom: 100,
          left: 'bottom'
        }
      }
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.detail{
  .chartPie{
    display: flex;
    justify-content: space-between;
    height:400px;
  }
  .chart{
    width:31%;
    background: #f5f5f5;
    height:350px;
    .chartTitle{
      height:40px;
      border-bottom:1px solid #fff;
      line-height:40px;
      font-size: 14px;
      font-weight: bold;
      padding-left:10px;
      background: #ddd;
    }
  }
  .chartChina{
    width:100%;
    height:480px;
  }
}
</style>
