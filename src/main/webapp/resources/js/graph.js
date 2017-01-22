/**
 * Created by Prophet on 2017/1/21.
 */
$(document).ready(function () {

    // 基于准备好的dom，初始化echarts实例
    var tempCharts = echarts.init(document.getElementById('temp-chart'));
    var humidityCharts = echarts.init(document.getElementById('humidity-chart'));
    var pressureCharts = echarts.init(document.getElementById('pressure-chart'));
    $('#humidity-chart').hide();
    $('#pressure-chart').hide();
    $('#temp-chart').show();

    // 存储接收数据的array
    var tempData = [];
    var humidityData = [];
    var pressureData = [];

    // 显示 temp Charts
    function showTempCharts() {
        tempData.push(randomData());

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'Temperature'
            },
            legend: {
                data:['Temperature']
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return 'Temperature: ' + params.value[1] + ' ℃';
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: '℃',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: true
                }
            },
            series: [{
                name: 'Temperature',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: tempData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        tempCharts.setOption(option);
    }

    // 显示 humidity Charts
    function showHumidityCharts() {
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'Humidity'
            },
            legend: {
                data:['Humidity']
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return 'Humidity: ' + params.value[1] + ' %rH';
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: '%rH',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: true
                }
            },
            series: [{
                name: 'Humidity',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: humidityData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        humidityCharts.setOption(option);
    }

    // 显示 pressure Charts
    function showPressureCharts() {
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'Pressure'
            },
            legend: {
                data:['Pressure']
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    return 'Pressure: ' + params.value[1] + ' hPa';
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                name: 'hPa',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: true
                }
            },
            series: [{
                name: 'Pressure',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: pressureData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        pressureCharts.setOption(option);
    }


    function randomData() {
            var date = new Date();
            var value = Math.random() + 1;
            return {
                name: date,
                value: [
                    date,
                    value
                ]
            }
    }


    showTempCharts();
    showHumidityCharts();
    showPressureCharts();

    setInterval(function () {
        if(tempData.length > 60) {
            tempData.shift();
        }
        tempData.push(randomData());
        tempCharts.setOption({
            series: [{
                data: tempData
            }]
        })
    }, 1000);
    setInterval(function () {
        if(humidityData.length > 60) {
            humidityData.shift();
        }
        humidityData.push(randomData());
        humidityCharts.setOption({
            series: [{
                data: humidityData
            }]
        })
    }, 1000);
    setInterval(function () {
        if(pressureData.length > 60) {
            pressureData.shift();
        }
        pressureData.push(randomData());
        pressureCharts.setOption({
            series: [{
                data: pressureData
            }]
        })
    }, 1000);

    $('#temp_button').click(function () {
        $('#temp_button').parent().attr("class", "active");
        $('#humidity_button').parent().removeAttr("class");
        $('#pressure_button').parent().removeAttr("class");
        $('#humidity-chart').hide();
        $('#pressure-chart').hide();
        $('#temp-chart').show();
    })
    $('#humidity_button').click(function () {
        $('#humidity_button').parent().attr("class", "active");
        $('#pressure_button').parent().removeAttr("class");
        $('#temp_button').parent().removeAttr("class");
        $('#temp-chart').hide();
        $('#pressure-chart').hide();
        $('#humidity-chart').show();
    })
    $('#pressure_button').click(function () {
        $('#pressure_button').parent().attr("class", "active");
        $('#temp_button').parent().removeAttr("class");
        $('#humidity_button').parent().removeAttr("class");
        $('#temp-chart').hide();
        $('#humidity-chart').hide();
        $('#pressure-chart').show();
    })

});