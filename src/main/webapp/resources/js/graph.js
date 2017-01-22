/**
 * Created by Prophet on 2017/1/21.
 */
$(document).ready(function () {

    // message type
    var messageType = "temp";


    // STOMP connect
    var url = "ws://www.prophet-xu.com:61614/stomp";
    var login = "";
    var passcode = "";
    var receiveDestination = "/topic/messanger.topic.server";
    var sendDestination = "/topic/messanger.topic.device";
    // STOMP client
    var client = Stomp.client(url);
    // on connect callback
    var onconnect = function (frame) {
        // subscribe receive topic
        client.subscribe(receiveDestination, function (message) {
            // add new data
            switch(messageType) {
                case "temp":
                    addTempData(parseFloat(message.body));
                    break;
                case "humidity":
                    addHumidityData(parseFloat(message.body));
                    break;
                case "pressure":
                    addPressureData(parseFloat(message.body));
                    break;
            }
        })
        // default display temp data
        client.send(sendDestination, {foo: 1}, "start temp");
    }
    // connect to broker
    client.connect(login, passcode, onconnect);



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


    // return new data based on data
    function newData(data) {
        var date = new Date();
        return {
            name: date,
            value: [
                date,
                data
            ]
        }
    }

    function addTempData(data) {
        if (tempData.length > 60) {
            tempData.shift();
        }
        tempData.push(newData(data));
        tempCharts.setOption({
            series: [{
                data: tempData
            }]
        });
    }

    function addHumidityData(data) {
        if(humidityData.length > 60) {
            humidityData.shift();
        }
        humidityData.push(newData(data));
        humidityCharts.setOption({
            series: [{
                data: humidityData
            }]
        });
    }

    function addPressureData(data) {
        if(pressureData.length > 60) {
            pressureData.shift();
        }
        pressureData.push(newData(data));
        pressureCharts.setOption({
            series: [{
                data: pressureData
            }]
        });
    }





    showTempCharts();
    showHumidityCharts();
    showPressureCharts();

    // setInterval(function () {
    //     if(tempData.length > 60) {
    //         tempData.shift();
    //     }
    //     tempData.push(randomData());
    //     tempCharts.setOption({
    //         series: [{
    //             data: tempData
    //         }]
    //     })
    // }, 1000);
    // setInterval(function () {
    //     if(humidityData.length > 60) {
    //         humidityData.shift();
    //     }
    //     humidityData.push(randomData());
    //     humidityCharts.setOption({
    //         series: [{
    //             data: humidityData
    //         }]
    //     })
    // }, 1000);
    // setInterval(function () {
    //     if(pressureData.length > 60) {
    //         pressureData.shift();
    //     }
    //     pressureData.push(randomData());
    //     pressureCharts.setOption({
    //         series: [{
    //             data: pressureData
    //         }]
    //     })
    // }, 1000);



    $('#temp_button').click(function () {
        client.send(sendDestination, {foo: 1}, "start temp");
        messageType = "temp";
        $('#temp_button').parent().attr("class", "active");
        $('#humidity_button').parent().removeAttr("class");
        $('#pressure_button').parent().removeAttr("class");
        $('#humidity-chart').hide();
        $('#pressure-chart').hide();
        $('#temp-chart').show();
    })
    $('#humidity_button').click(function () {
        client.send(sendDestination, {foo: 1}, "start humidity");
        messageType = "humidity";
        $('#humidity_button').parent().attr("class", "active");
        $('#pressure_button').parent().removeAttr("class");
        $('#temp_button').parent().removeAttr("class");
        $('#temp-chart').hide();
        $('#pressure-chart').hide();
        $('#humidity-chart').show();
    })
    $('#pressure_button').click(function () {
        client.send(sendDestination, {foo: 1}, "start pressure");
        messageType = "pressure";
        $('#pressure_button').parent().attr("class", "active");
        $('#temp_button').parent().removeAttr("class");
        $('#humidity_button').parent().removeAttr("class");
        $('#temp-chart').hide();
        $('#humidity-chart').hide();
        $('#pressure-chart').show();
    })

    /**
     * disconnect when page is closed
     */
    $(window).bind('beforeunload',function(){
        client.send(sendDestination, {foo: 1}, "stop");
        client.disconnect();
    });
});