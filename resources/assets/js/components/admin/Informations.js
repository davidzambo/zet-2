import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';


export default class Informations extends Component {
  constructor(props) {
    super(props);
    this.handleClosed = this.handleClosed.bind(this);
  }

  handleClosed(e){
    let formGroup = e.target.closest('.form-group');
    let inputs = formGroup.querySelectorAll('input[type="text"');

    if (e.target.checked)
      for (let i = 0; i < inputs.length; i++)
        inputs[i].disabled = true;
    else
      for (let i = 0; i < inputs.length; i++)
        inputs[i].disabled = false;
  }

  render() {
    return (
      <Form className="row justify-content-center no-gutters">
        <div className="col-10 col-md-8 col-lg-7 col-xl-5">
          <h1>Bemutató üzlet és szerelvénybolt</h1>
          <hr/>
          <FormGroup row>
            <Label for="shop_postal_code" sm={2}>Irányítószám:</Label>
            <Col sm={3}>
              <Input type="text" name="shop_postal_code" id="shop_postal_code" title="Bolt irányítószáma" required pattern="[\d]{4}"/>
              <FormText>négy számjegy</FormText>
            </Col>

            <Label for="shop_city" sm={2}>Település:</Label>
            <Col sm={5}>
              <Input type="text" name="shop_city" id="shop_city" title="Bolt település" placeholder="pl.: Miskolc" required pattern="[a-zA-ZáÁéÉóÓöÖőŐüÜűŰ]{3,}"/>
              <FormText>csak betű</FormText>
            </Col>
          </FormGroup>
          
          <FormGroup row>
            <Label for="shop_street" sm={2}>Utca:</Label>
            <Col sm={4}>
              <Input type="text" name="shop_street" id="shop_street" title="Bolt utca" placeholder="pl.: Széchenyi u." required pattern="[a-zA-ZáÁéÉóÓöÖőŐüÜűŰ]{3,}[\s][a-zA-ZáÁéÉóÓöÖőŐüÜűŰ\.]{1,}"/>
            </Col>
            <Label for="shop_number" sm={2}>Házszám:</Label>
            <Col sm={4}>
              <Input type="text" name="shop_number" id="shop_number" title="Bolt házszám" placeholder="pl.: 70. mélyföldszint" required/>
            </Col>
          </FormGroup>
          
          <FormGroup row>
            <Label for="shop_details" sm={3}>Megjegyzés:</Label>
            <Col sm={9}>
              <Input type="text" name="shop_details" id="shop_details" title="Bolt megjegyzés" placeholder="pl.: Batóház"/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="shop_phone_number" sm={3}>Telefonszám:</Label>
            <Col sm={9}>
              <Input type="text" name="shop_phone_number" id="shop_phone_number" title="Bolt telefonszáma" placeholder="pl.: 46756660" required pattern="[\d]{8,}"/>
              <FormText> csak számok, egybeírva, ország előhívó nélkül</FormText>
            </Col>
          </FormGroup>

          <h3 className="mt-4">Nyitva tartás:</h3>
          <FormGroup row className="justify-content-center">
            <Label for="monday" xs={12} sm={2}>hétfő:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="monday_open" id="monday_open" bsSize={"sm"} title="hétfő nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="monday_close" id="monday_close" bsSize={"sm"} title="hétfő zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="monday_closed" check>
                <Input type="checkbox" name="monday_closed" id="monday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="tuesday" xs={12} sm={2}>kedd:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="tuesday_open" id="tuesday_open" bsSize={"sm"} title="kedd nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="tuesday_close" id="tuesday_close" bsSize={"sm"} title="kedd zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="tuesday_closed" check>
                <Input type="checkbox" name="monday_closed" id="tuesday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="wednesday" xs={12} sm={2}>szerda:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="wednesday_open" id="wednesday_open" bsSize={"sm"} title="szerda nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="wednesday_close" id="wednesday_close" bsSize={"sm"} title="szerda zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="wednesday_closed" check>
                <Input type="checkbox" name="monday_closed" id="wednesday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="thursday" xs={12} sm={2}>csütörtök:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="thursday_open" id="thursday_open" bsSize={"sm"} title="csütörtök nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="thursday_close" id="thursday_close" bsSize={"sm"} title="csütörtök zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="thursday_closed" check>
                <Input type="checkbox" name="monday_closed" id="thursday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="friday" xs={12} sm={2}>péntek:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="friday_open" id="friday_open" bsSize={"sm"} title="péntek nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="friday_close" id="friday_close" bsSize={"sm"} title="péntek zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="friday_closed" check>
                <Input type="checkbox" name="monday_closed" id="friday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="saturday" xs={12} sm={2}>szombat:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="saturday_open" id="saturday_open" bsSize={"sm"} title="szombat nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="saturday_close" id="saturday_close" bsSize={"sm"} title="szombat zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="saturday_closed" check>
                <Input type="checkbox" name="monday_closed" id="saturday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>

          <FormGroup row className="justify-content-center">
            <Label for="sunday" xs={12} sm={2}>vasárnap:</Label>
            <Col xs={5} sm={3}>
              <Input type="text" name="sunday_open" id="sunday_open" bsSize={"sm"} title="vasárnap nyitás" required />
            </Col>
            <Col xs={5} sm={3}>
              <Input type="text" name="sunday_close" id="sunday_close" bsSize={"sm"} title="vasárnap zárás" required />
            </Col>
            <Col xs={2}>
              <Label for="sunday_closed" check>
                <Input type="checkbox" name="monday_closed" id="sunday_closed" onClick={this.handleClosed} /> {' '}zárva
              </Label>
            </Col>
          </FormGroup>




          <h1 className="mt-5">Iroda és üzem</h1>
          <hr />
          <FormGroup row>
            <Label for="factory_postal_code" sm={2}>Irányítószám:</Label>
            <Col sm={3}>
              <Input type="text" name="factory_postal_code" id="factory_postal_code" title="Üzem irányítószáma" required pattern="[\d]{4}"/>
              <FormText>négy számjegy</FormText>
            </Col>

            <Label for="factory_city" sm={2}>Település:</Label>
            <Col sm={5}>
              <Input type="text" name="factory_city" id="factory_city" title="Üzem település" placeholder="pl.: Felsőzsolca" required pattern="[a-zA-ZáÁéÉóÓöÖőŐüÜűŰ]{3,}"/>
              <FormText>csak betű</FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="factory_street" sm={2}>Utca:</Label>
            <Col sm={4}>
              <Input type="text" name="factory_street" id="factory_street" title="Üzem utca" required pattern="[a-zA-ZáÁéÉóÓöÖőŐüÜűŰ]{3,}[\s][a-zA-ZáÁéÉóÓöÖőŐüÜűŰ\.]{1,}"/>
            </Col>
            <Label for="factory_number" sm={2}>Házszám:</Label>
            <Col sm={4}>
              <Input type="text" name="factory_number" id="factory_number" title="Üzem házszám" placeholder="pl.: 70." required/>
            </Col>
          </FormGroup>


          <FormGroup row>
            <Label for="factory_phone" sm={3}>Telefonszám / fax:</Label>
            <Col sm={9}>
              <Input type="text" name="factory_phone" id="factory_phone" title="Üzem telefonszáma" placeholder="pl.: 46756660" required pattern="[\d]{8,}"/>
              <FormText> csak számok, egybeírva, ország előhívó nélkül</FormText>              
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="factory_mobile" sm={3}>Mobil:</Label>
            <Col sm={9}>
              <Input type="text" name="factory_mobile" id="factory_mobile" title="Üzem mobil telefonszáma" placeholder="pl.: 309288808" required pattern="[\d]{8,}"/>
              <FormText> csak számok, egybeírva, ország előhívó nélkül</FormText>              
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="factory_email" sm={3}>E-mail:</Label>
            <Col sm={9}>
              <Input type="email" name="factory_email" id="factory_email" title="E-mail" placeholder="pl.: info@zamboestarsa.hu" required/>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="factory_web" sm={3}>Web:</Label>
            <Col sm={9}>
              <Input type="url" name="factory_web" id="factory_web" title="Honlap címe" placeholder="pl.: http://www.zamboestarsa.hu" required/>
            </Col>
          </FormGroup>

          <FormGroup className="mt-5">
              <Button type="submit" color="primary" block>frissítés</Button>
          </FormGroup>



        </div>
      </Form>
    );
  }
}
