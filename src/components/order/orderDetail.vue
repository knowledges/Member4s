<template>
    <div>
        <div class="gobacklist">
        	<a href="" class="goback G_f14"><i class="ui_icon_18 icon-new-uc icon-new-uc-goback"></i>返回列表</a>
        	<bar class="nav nav-tabs clearfix datailnav">
	            <bar-item path="/u/order/orderDetail" label="订单详情" class="tab-active"></bar-item>
	        </bar>
        </div>
        
        <div class="detailCon">
        	<!--商品信息-->
        	<div class="U_new_order" role="商品信息">
	            <div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>商品信息</strong></li>
	                </ul>
	            </div>
	            <div class="U_info_content">
	                <div>
	                    <table>
	                        <thead>
	                            <tr>
	                                <th>商品</th>
	                                <th>总价/元</th>
	                                <th>定金/元</th>
	                                <th>交易状态</th>
	                                <th>上牌地</th>
	                            </tr>
	                        </thead>
	                        <tbody>
	                            <tr>
	                                <td>
	                                    <dl class="clearfix">
	                                        <dt>
	                                            <img src="http://yichenghui.oss-cn-shanghai.aliyuncs.com/gouchehui/web/Upload/modelimg/2015-09-09/55efc15b4c243.jpg" alt="雪佛兰 科鲁兹" width="120" height="80">
	                                        </dt>
	                                        <dd>
	                                            <a v-link="" class="orange">日产轩逸2016款 1.6XV CVT自豪版</a>
	                                            <p>外观：白色  内饰：黑色</p>
	                                        </dd>
	                                    </dl>
	                                </td>
	                                <td>
	                                    124,800
	                                </td>
	                                <td>
	                                    2,000
	                                </td>
	                                <td>
	                                    <p>已付定金</p>
	                                </td>
	                                <td>
	                                                                                          南京
	                                </td>
	                            </tr>
	                        </tbody>
	                    </table>
	                </div>
	                <p>下单时间：2016年8月31日17:10:02 订单号：XXXXXXXXXXXXXXXXXXXXXXX</p>
	            </div>
	        </div>
	        <!--买家信息 strat-->
	        <div class="U_new_order" role="买家信息">
	            <div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>买家信息</strong></li>
	                </ul>
	            </div>
	            <div class="U_info_content">
	                <div class="U_info_per">
	                    <ul>
	                    	<li>
	                    		<dl>
	                    			<dt>订车人：</dt>
	                    			<dd>王小二</dd>
	                    		</dl>
	                    	</li>
	                    	<li>
	                    		<dl>
	                    			<dt>手机号码：</dt>
	                    			<dd>15163482888</dd>
	                    		</dl>
	                    	</li>
	                    	<li>
	                    		<dl>
	                    			<dt>身份证：</dt>
	                    			<dd><a href="">打开图片连接</a></dd>
	                    		</dl>
	                    	</li>
	                    	<li>
	                    		<dl>
	                    			<dt>提车时间：</dt>
	                    			<dd>2016-09-19</dd>
	                    		</dl>
	                    	</li>
	                    	<li>
	                    		<dl>
	                    			<dt>付款方式：</dt>
	                    			<dd>全款购车</dd>
	                    		</dl>
	                    	</li>
	                    	<li>
	                    		<dl>
	                    			<dt>购买保险：</dt>
	                    			<dd>购买</dd>
	                    		</dl>
	                    	</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
        	<!--买家信息 end-->
        	<!--定金金额明细 strat-->
		    <div class="paydetail" role="定金金额明细">
		    	<div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>定金金额明细</strong></li>
	                </ul>
	            </div>
		        <div class="payCon" id="J_OrderInsuranceContenter">
		        	<table border="" cellspacing="" cellpadding="" class="paytab G_f14">
		        		<tr>
		        			<td rowspan="5" width="130" class="tabSort">基本金额</td>
		        			<td width="480">购车惠底价</td>
		        			<td width="165">￥<span class="j_lowPrice"></span></td>
		        		</tr>
		                
		        		<tr class="j_baseTr">
		        			<td width="480">
		                        <!--<i class="tips-mandatory">*</i>-->
		                        <span class="checkFrame selected"></span><span class="j_insuranceName">购置税</span></td>
		        			<td width="165">
		                        ￥<span class="j_purchaseTax j_spanVal">-</span>
		                        <input type="hidden" name="cess" value=""/>
		                    </td>
		                    
		        		</tr>
		
		        		<tr class="j_baseTr j_agencyService">
		            			<td width="480">
		                            <span class="checkFrame selected"></span><span class="j_insuranceName">车船使用税</span></td>
		            			<td width="165">
		                            ￥<span class="j_usageTax j_spanVal">-</span>
		                            <input type="hidden" name="travel_tax" value=""/>
		                        </td>
		        		</tr>
		
		
		        		<tr class="j_baseTr j_agencyService">
		                    <td width="480">
		                        <span class="checkFrame selected"></span><span class="j_insuranceName">上牌费</span></td>
		        			<td width="165">
		                        ￥<span class="j_licenseTax j_spanVal">-</span>
		                        <input type="hidden" name="licensing_fees" value="" />
		                    </td>
		        		</tr>
		
		
		        		<tr class="tabTr G_f12">
		        			<td colspan="2" class="subtotal">小计：<span>￥<i class="j_baseSubtotal">-</i></span></td>
		        		</tr>
		
		        		<!--保险-->
		
		        		<tr class="j_tr j_agencyService">
		        			<td rowspan="6" width="130" class="tabSort">保险</td>
		        			<td width="480">
		                        <span class="checkFrame selected"></span><span class="j_insuranceName">交强险</span></td>
		        			<td width="165">
		                        ￥<span class="j_strongInsurance j_spanVal">-</span>
		                        <input type="hidden" name="compulsory_insurance" value="" />
		                    </td>
		        		</tr>
		
		
		        		<tr class="j_tr j_agencyService">
		        			<td width="480">
		        				<span><span class="checkFrame selected"></span><span class="j_insuranceName">车辆损失险:</span></span>
		                        <span class="selRadio">
		                        	家用6座以下
		                            <!--<select name="damageInsurance" class="damageInsuranceSlt" id="J_damageInsuranceSlt">
		                                <option value="603" selected="selected">家用6座以下</option>
		                                <option value="724">家用6至10座</option>
		                            </select>-->
		                        </span>
		        			</td>
		        			<td width="165">
		                        ￥<span class="j_damageInsurance j_spanVal">-</span>
		                        <input type="hidden" name="car_loss_dang"  class="j_inpVal" value="" />
		                    </td>
		        		</tr>
		
		
		        		<tr class="j_tr j_agencyService">
		        			<td width="480">
		        				<span><span class="checkFrame selected"></span><span class="j_insuranceName">第三者责任险:</span></span>
		                        <span class="selRadio">
		                        	保额：50万
		                            <!--<select name="thirdInsurance" class="thirdInsuranceSlt" id="J_thirdInsuranceSlt">
		                                <option value="1614">保额：50万</option>
		                                <option selected="selected" value="2102">保额：100万</option>
		                            </select>-->
		                        </span>
		
		        			</td>
		        			<td width="165">
		                        ￥<span class="j_thirdInsurance j_spanVal">-</span>
		                        <input type="hidden" name="liability"  class="j_inpVal" value="" />
		                    </td>
		        		</tr>
		
		
		        		<tr class="j_tr j_agencyService">
		        			<td width="480"><span class="checkFrame j_checkItem selected"></span><span class="j_insuranceName">车上人员责任险</span>（默认为5个座位，每多出一个座位，多加26元）</td>
		        			<td width="165">
		                        ￥<span class="j_passengerInsurance j_spanVal">-</span>
		                        <input type="hidden" name="car_liability"  class="j_inpVal" value="" />
		                    </td>
		        		</tr>
		
		
		        		<tr class="j_tr j_agencyService">
		        			<td width="480"><span class="checkFrame j_checkItem selected"></span><span class="j_insuranceName">附加不计免赔特约</span></td>
		        			<td width="165">
		                        ￥<span class="j_noDeductibleInsurance j_spanVal">-</span>
		                        <input type="hidden" name="deductible_special"  class="j_inpVal" value="" />
		                    </td>
		        		</tr>
		
		        		<tr class="tabTr G_f12">
		        			<td colspan="2" class="subtotal">小计：<span>￥<i class="j_insuranceSubtotal">-</i></span></td>
		        		</tr>
		        		<tr class="tabTr G_f12">
		        			<td colspan="3" class="subtotal"><span class="c999">(此结果有微小误差，实际费用以当地缴费为准)</span>总计：<span>￥<i class="j_alltotal">-</i></span></td>
		        		</tr>
		        	</table>
		        </div>
		    </div>
        	<!--定金金额明细end-->
        	<!--精品礼包 start-->
		    <div class="packagesbox" rol="精品礼包">
		        <div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>精品礼包</strong></li>
	                </ul>
	            </div>
		        <ul>
		              <li>
		                  <dl>
		                  	<dt><img src="/img/packages_03.jpg" alt="宝马M3 真皮方向盘套"/></dt>
		                  	<dd>宝马M3 真皮方向盘套</dd>
		                  </dl>
		              </li>
		              <i>+</i>
		              <li>
		              	<dl>
		              		<dt><img src="/img/packages_05.jpg" alt="宝马M3 脚垫"/></dt>
		              		<dd>宝马M3 脚垫一副</dd>
		              	</dl>
		              </li>
		              <i>+</i>
		              <li>
		              	<dl>
		              		<dt><img src="/img/packages_07.jpg" alt="宝马M3 专用机油"/></dt>
		              		<dd>宝马M3 专用机油3罐</dd>
		              	</dl>
		              </li>
		              <i>+</i>
		              <li>
		              	<dl>
		              		<dt><img src="/img/packages_09.jpg" alt="米其林轮胎"/></dt>
		              		<dd>米其林备用轮胎一个</dd>
		              	</dl>
		              </li>
		              <i>+</i>
		              <li>
		              	<dl>
		              		<dt><img src="/img/packages_11.jpg" alt="盾牌润滑油"/></dt>
		              		<dd>盾牌润滑油一瓶</dd>
		              	</dl>
		              </li>
		        </ul>
		    </div>
		    <!--精品礼包 end-->
		    <!--发票信息 start-->
		    <div class="invoicebox clearfix">
		        <div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>发票信息</strong></li>
	                </ul>
	            </div>
		        <p class="G_f14 ftx02">定金无发票，支付信息为定金收据凭证。购车惠为信息平台，实际开票价与平台订车价如有差异，您只凭平台订车价支付车款，高出的部分不补差价，低于部分不退差价，不开发票。</p>
		    </div>
		    <!--发票信息 end-->
		    <!--优惠券 start-->
		    <div class="invoicebox clearfix">
		        <div class="nav_title clearfix">
	                <ul class="nav_title_left">
	                    <li class="nav_title_li_border"></li>
	                    <li><strong>优惠券</strong></li>
	                </ul>
	            </div>
		        <div class="discou">
		        	<ul id="J_OrderCouponList">
		                <li>
		                    <dl>
		                        <dt class="G_f18">￥<span class="G_f30 j_moneyBox"></span></dt>
		                        <dd class="G_f12"></dd>
		                    </dl>
		                    <i></i>
		                </li>
		        	</ul>
		        	<p>金额抵用<span>￥ <i id="J_disMoney">-</i></span></p>
		        </div>
		    </div>
		    <!--优惠券 end-->
		    <!--定金支付 start-->
		    <div class="depositbox G_f14 ftx02">
		    	<div class="G_fl">
		    		提示：提车成功后，在购车惠平台支付的定金可抵用车款
		    	</div>
		    	<div class="depMoney G_fr">
		    		<div class="deposit">应付定金：<i>￥</i><span class="spq1" id="J_DepositBox"></span></div>
		    		<div class="deposit" id="J_CouponPrice">优惠券：<i>-￥</i><span class="spq1" id="J_CouponPriceBox">-</span></div>
		    		<div class="deposit G_f16">实际支付：<span data-price="3000"><i>￥</i><b id="J_RealPaidBox"></b></span></div>
		        	<!--<input type="submit" class="submit G_btn_a" value="去支付"/>-->
		    		<div class="view-contract">
		    			查看<a href="javascript:" class="view-contract-btn" v-on:click="alertContract()">《汽车委托订车合同》</a>
		    		</div>
		    	</div>
		    </div>
		    <!--定金支付 end-->
		    <!-- 合同 start -->
		    <div style="display: none;" id="order-contract">
			    <div class="order-contract">
			        <div class="information clearfix">
			            <p class="contract-num">合同编号：<span></span></p>
			            <div class="company G_fl">
			                <p><span class="tit">甲方：</span><span class="bd">南京易橙汇网络科技有限公司</span></p>
			                <p><span class="tit">地址：</span><span class="bd">江苏省南京市玄武区徐庄软件园研发三区F幢2号楼三层</span></p>
			                <p><span class="tit">电话：</span><span class="bd">025-85581702/85581703</span></p>
			                <p><span class="tit">传真：</span><span class="bd">025-85581729-8005</span></p>
			            </div>
			            <div class="consumer G_fl">
			                <p><span class="tit">乙方：</span><span class="bd j_partyBname"></span></p>
			                <p><span class="tit">地址：</span><span class="bd j_partyBaddress"></span></p>
			                <p><span class="tit">电话：</span><span class="bd j_partyBtel"></span></p>
			                <p><span class="tit">身份证：</span><span class="bd j_partyBcode"></span></p>
			            </div>
			        </div>
			
			        <div class="matters">
			            <h2>一.委托事项:</h2>
			            <p>乙方全权委托甲方代为定购以下车型汽车，并负责代为办理汽车上牌手续。</p>
			            <div class="matter-mes">
			                <table border=1 cellspacing=0 cellpadding=0 >
			                    <tr>
			                        <td>
			                            车型：<span>{$pay_info.carstyle}</span>
			                        </td>
			                        <td>
			                            ①车辆统一价格：<span>{$pay_info.auth_price}</span> 元
			                        </td>
			                    </tr>
			                    <tr>
			                        <td>车身颜色：<span>{$pay_info.exterior_color_name}</span> </td>
			                        <td>②优惠：<span>{$pay_info.discount}</span> 元</td>
			                    </tr>
			                    <tr>
			                        <td>内饰：<span>{$pay_info.interior_color_name}</span></td>
			                        <td>③车辆净价：<span>{$pay_info.low_price}</span> 元</td>
			                    </tr>
			                </table>
			            </div>
			        </div>
			
			        <div class="other">
			            <table border=1 cellspacing=0 cellpadding=0 >
			                <tr class="oth-t">
			                    <td>选装件</td>
			                    <td>赠送物品</td>
			                    <td>代办服务</td>
			                </tr>
			                <tr class="oth-b">
			                    <td><span></span></td>
			                    <td>{$package.description}</td>
			                    <td class="j_orderAgencyService"></td>
			                </tr>
			                <tr>
			                    <td>④选装件总计:</td>
			                    <td><span></span></td>
			                    <td>代办服务总计: <span class="j_agencyServicePrice"></span>元</td>
			                </tr>
			            </table>
			        </div>
			
			        <div class="buycar">
			            <p>车辆订购部分</p>
			            <table border=1 cellspacing=0 cellpadding=0 >
			                <tr>
			                    <td colspan=3 rowspan=3 class="paym">定 金 不 退</td>
			                    <td>⑦应付款总计：<span class="j_allPriceBox"></span>元</td>
			                </tr>
			                <tr>
			                    <td>⑧应付定金：<span class="j_depositPrice">{$pay_info.order_money}</span>元</td>
			
			                </tr>
			                <tr>
			                    <td>⑨应付余额：<span class="j_balancePrice"></span>元</td>
			                </tr>
			            </table>
			        </div>
			
			        <div class="carandpay">
			            <h2>二.交车与付款：</h2>
			            <ol>
			                <li>
			                    <div class="place">
			                        <p>交货地点与方式：由乙方到甲方指定4S店提车。</p>
			                        <p>预计交车日：<span class="j_buyCarDateTime"></span>之前</p>
			                        <p>乙方将定金付至甲方指定账户，待甲方确认定金款到帐后，合同生效，乙方即可在约定日期提车。</p>
			                    </div>
			                </li>
			                <li>
			                    <div class="pay-mode">
			                        <p>付款方式：签订本合同时，乙方支付上述定金，余款乙方在提车之日将车付至4S店指定账户，待4S店确认车款全额到帐后，乙方方可提车。</p>
			                    </div>
			                </li>
			                <li>
			                    <div class="car-price">
			                        <p>车价以提车时销售价格为准。车价包含:<b> 裸车价 + 保险 + 其他等</b></p>
			                    </div>
			                </li>
			            </ol>
			        </div>
			
			        <div class="obligation">
			            <h2>三.权益与义务:</h2>
			            <ol>
			                <li>
			                    <p>甲方应当勤勉尽责的办理上述车型汽车的委托定购车辆事宜，委托定购车辆必须符合上述有关型号及配置的约定。</p>
			                </li>
			                <li>
			                    <p>甲方保证所委托定购的车辆为全新车辆。根据工作进度由甲方督促4S店提供如下单据：<span class="spec">车辆合格证、销售发票（3联）、车辆一致性证书、保修手册、车辆钥包含遥控。</span></p>
			                </li>
			                <li>
			                    <p>甲方协助乙方维护自身正当权益。</p>
			                </li>
			                <li>
			                    <p>乙方有按照本合同的约定履行按时足额付款的义务。</p>
			                </li>
			                <li>
			                    <p>乙方应当在约定的时间和地点及时进行车辆验收并提车。</p>
			                </li>
			            </ol>
			        </div>
			
			        <div class="acceptance">
			            <h2>四.车辆验收：</h2>
			            <p>提车时按车辆出厂标准由乙方或乙方委托的代表验收，如异议应当场提出，如当场未提出异议，则视为乙方认可甲方定购的车辆符合交车标准，且达到车辆出厂标准，车辆交接完毕后所产生的全部责任由乙方自行承担。</p>
			        </div>
			
			        <div class="responsibility">
			            <h2>五.违约责任:</h2>
			            <ol>
			                <li><p>如果甲方交付的汽车与本合同第一条约定不符，则乙方可以不接收车,甲方须在3个工作日内无条件退回全部已收款项。</p></li>
			                <li><p>如果乙方单方取消协议所定车辆到达协议交接地点，甲方发出交接提车通知两日内，乙方因自身原因未来办理交接提车，甲方有权解除合同，乙方已经支付的所有款项不予退回。</p></li>
			                <li><p>如因乙方原因导致车辆无法成交，乙方已经支付的所有款项不予退回。</p></li>
			                <li><p>甲方单方取消协议，乙方有权解除合同，甲方应当退回全部已收款项。</p></li>
			                <li><p>由于罢工，自然灾害，交通，天气，战争等不可抗拒或生产厂家（代理商）不及时交货等原因或因政府（如海关，商检局）非正常工作情况造成延误交车，甲方可免除违约责任。</p></li>
			            </ol>
			        </div>
			
			        <div class="repair">
			            <h2>六.维修与保养:</h2>
			            <p>代购车辆质量保证由车辆生产厂家（授权经销商）提供，以厂方出具的维修、保养服务配套条款为准，如属质量问题，安国家相关法律法规维护权益。</p>
			        </div>
			
			        <div class="solve">
			            <h2>七.解决合同纠纷方式:</h2>
			            <p>双方同意，有关本合同签订、履行而发生的任何争议，在无法通过协商解决和调解方式解决的情况下：</p>
			            <ol>
			                <li>
			                    <p>任何一方均可向南京市仲裁委员会提出仲裁。</p>
			                </li>
			                <li>
			                    <p>任何一方均可向甲方所在地人民法院提起诉讼。</p>
			                </li>
			            </ol>
			        </div>
			
			        <div class="clause">
			            <h2>八.补充条款：</h2>
			            <p>易橙汇网络科技有限公司旗下购车惠汽车平台为互联网信息平台，基于线上线下的信息的滞后特性，在收到用户委托定车定金后，无法履行定车事项及时通知用户并退还定金不视为违约，特此声明。</p>
			        </div>
			
			        <div class="others">
			            <h2>九.其他:</h2>
			            <ol>
			                <li><p>本合同条款未尽事宜，由甲乙双方协商解决。</p></li>
			                <li><p>本合同共计壹页。本合同一式贰份，双方各执壹份，双方代表签字（或盖章），并由甲方加盖公章后生效，此协议至交车当日截至。</p></li>
			            </ol>
			        </div>
			
			        <div class="footer clearfix">
			            <div class="company G_fl">
			                <p>甲方：<span>南京易橙汇网络科技有限公司</span></p>
			                <p>甲方代表签署（盖章）：</p>
			                <p>签订日期：<span></span></p>
			                <i class="con-pic"></i>
			            </div>
			            <div class="user G_fl">
			                <p>乙方：<span></span></p>
			                <p>乙方代表签署(盖章)：<span></span></p>
			                <p>签订日期：<span></span></p>
			            </div>
			        </div>
			    </div>
		    </div>
		    <!--合同 end-->
        </div>
        
        
    </div>
</template>

<script>
    import Bar from "../Bar.vue"
    import BarItem from "../BarItem.vue"
    import $ from 'jquery'
    
    export default {
        data(){
            return {
            }
        },
        components: {
            Bar,
            BarItem
        },
        methods: {
        	alertContract(){
                layer.open({
                    type: 1,  //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
                    title: ['汽车委托定车合同', 'text-align:center;font-size:18px'],  //title数组第二项可以写任意css样式；
                    maxmin: true,
                    shadeClose: true,  //点击遮罩关闭层
                    skin: 'layui-layer-rim',  //加上边框
                    area : ['920px' , '580px'],  //定义layer的宽高
                    content: $("#order-contract")  //这里content是一个DOM
                    });
            }
        }
    }
</script>
<style scoped>
/*@import '/css/order.css'*/
/*@import './../../assets/css/order.css';*/

.G_f12 { font-size:12px }
.G_f14 { font-size:14px }
.G_f16 { font-size:16px }
.G_f18 { font-size:18px }
.detailCon{
	padding: 20px;
}
.gobacklist{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 999;
}
.goback{
	position: absolute;
	right: 25px;
	bottom: 5px;
}
.icon-new-uc-goback{
	background-position: 0 -320px;
	margin-right: 6px;
}

.nav_title{
    margin:10px 0 0 0;
}
.nav_title .nav_title_left {
    float: left;
    padding: 10px 0;
    display: inline-block;
    width: 50%;
}
.nav_title .nav_title_left li {
    float: left;
    padding-left: 5px;
    margin: 0;
    display: inline-block;
}
.nav_title .nav_title_left .nav_title_li_border {
    border-left: 4px solid #ff7920;
    height: 17px;
}
.nav_title .nav_title_left .icon-news {
    background-position: -60px -290px;
}
.nav_title .nav_title_left em {
    color: #ff7920;
}

.U_new_order .U_info_content table{
    width: 100%;
    border:1px solid #e5e5e5;
}
.U_new_order .U_info_content table thead tr th{
    padding: 10px;
    text-align: center;
    background: #f1f2f3;
    color: #000000;
}
.U_new_order .U_info_content table tbody tr td{
    border: 1px solid #e5e5e5;
    text-align: center;
}
.U_new_order .U_info_content table tbody tr td dl dd,.U_new_order .U_info_content table tbody tr td dl dt{
    float: left;
}
.U_new_order .U_info_content table tbody tr td dl dd{
    line-height: 30px;
    margin-top: 20px;
}
.U_new_order .U_info_content table tbody tr td dl dd a{
    line-height: normal;
}
.U_new_order .U_info_content table tbody tr td a {
    display: block;
}
.U_new_order .U_info_content p{
	line-height: 25px;
	padding: 5px;
}
table tbody tr td dl dd a.orange{
    color: #ff791f;
}
/*买家信息*/
.U_info_content .U_info_per li{
	color: #666666;
	line-height: 26px;
	overflow: hidden;
}
.U_info_content .U_info_per li dt{
	width: 100px;
	text-align: right;
	float: left;
	margin-right: 10px;
}
.U_info_content .U_info_per li dd{
	float: left;
}

/*订单金额明细*/
.paydetail .payCon{
	margin-left: 0;
}
.packagesbox .nav_title ul li{
	width: auto;
}
.invoicebox .discou li{
	width: 158px;
	height: 98px;
	border: 2px solid #fa8c35;
	background: url(/img/bg-coupon-normal.png) center center no-repeat;
}
.invoicebox .discou li i{
	display: block;
	right: 0;
	background: url(/img/defalut_bg.png) center center no-repeat;
}
/*定金支付*/
.depositbox{
	padding: 0;
}
.depositbox .G_fl{
	padding-left: 20px;
}
.depositbox .depMoney{
	margin-top: 50px;
}
.order-contract{
	overflow-y: visible;
}
.order-contract .footer .con-pic{
	background: url(/img/contract.png) center center no-repeat;
}
.layui-layer-title{
	text-align: center;
}
.paydetail .payCon .paytab td .selRadio{
	margin-left: 0;
}
</style>