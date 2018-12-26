//基础表单的封装
import {Form, Button, Input, InputNumber, Select, DatePicker} from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

class BaseForm extends React.Component{
    constructor(props){
        super(props);
    }

    initFormItem=()=>{
        const {getFieldDecorator}=this.props.form;
        const formList = this.props.formList;     //获取子组件表单配置
        const formItemLayout = {                  //配置表单默认响应式布局 (Mobile || PC)
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 8 ,offset : 8},
            },
        };                                     
        let formItemList = [];
        if(formList && formList.length > 0)
        {
            //遍历配置项
            formList.map((item,index)=>{
                //init default data
                let initialValue = item.initialValue || "";    //FormItem初始值
                let label = item.label || "";                  //FormItem标签值
                let width = item.width || "";                  //FormItem宽度
                let placeholder = item.placeholder;
                let fieldNmae = item.fieldName;                //FormItem项的name(传入后台的name)
                let rules = item.rules || [];                  //校验规则,数组对象  
                //input
                if(item.type == "input"){
                    let prefix = item.prefix || "";            //可选项,input框的prefix,可加图标Icon组件
                    const input = 
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator({fieldNmae}, {
                            rules:{rules} 
                        })(
                        <Input prefix={prefix} placeholder={placeholder} />
                        )}
                    </FormItem> 
                    formItemList.push(input);
                }
                //select
                else if(item.type == "select")
                {
                    let optionList = item.optionList || [];      //select下拉框name和value
                    const select = 
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator({fieldNmae}, {
                            rules:{rules} 
                        })(
                        <Select placeholder={placeholder} style={{width:width}}>
                            {this.iterateSelect(optionList)}               
                        </Select>
                        )}
                    </FormItem>
                    formItemList.push(select);
                }
                //date
                else if (item.type == "date")
                {
                    const date = 
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator({fieldNmae}, {
                            rules:{rules} 
                        })(
                        <DatePicker format="YYYY-MM-DD" placeholder={placeholder} style={{width:width}}>       
                        </DatePicker>
                        )}
                    </FormItem>
                    formItemList.push(date);
                }

            })
        }

        return formItemList;
    }

    iterateSelect = (optionList)=>{                 //迭代下拉框数据
        if(!optionList){
            return [];
        }
        return optionList.map((item,index)=>{
            <Option value={item.name}>{item.value}</Option>
        })
    }

    render(){
        return(
            <Form>
                {this.initFormItem}     {/*生成基础表单项*/}
                <Button type="primary" onClick={()=>{this.props.handleSubmit}}>   {/*处理事件应该放在父组件*/}
                    Ok
                </Button>
                <Button onClick={()=>{this.props.handleCancel}} >
                    Cancel
                </Button>
            </Form>
        )
    }
}


export default Form.create()(BaseForm);
