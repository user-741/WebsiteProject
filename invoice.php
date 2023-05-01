<?php
$to_whom = $_POST['to_whom'];
$name = $_POST['name'];
$quantity = $_POST['quantity'];
$description = $_POST['description'];
$unit_price = $_POST['unit_price'];
$date = $_POST['date'];
$invoice_number = $_POST['invoice_number'];

$line_total = $unit_price * $quantity;

$business_info = "<div class='business-info'>
                    <h2>Naderi Safe Life Driving School</h2>
                    <p>Phone: 0431008565</p>
                    <p>Business Address: 1 Edis Court Endeavour hills</p>
                    <p>Email: hilove2022@yahoo.com</p>
                    <p>ABN: 37762494474</p>
                    <p>BSB: 013289</p>
                    <p>Account Number: 290707003</p>
                    <p>Account Name: Gulam H Naderi</p>
                  </div>";

$invoice_info = "<div class='invoice-info'>
                   <h3>Tax Invoice</h3>
                   <p>Date of invoice: $date</p>
                   <p>Invoice number: $invoice_number</p>
                   <p>To: $to_whom</p>
                 </div>";

$table_header = "<tr>
                   <th>Quantity</th>
                   <th>Description</th>
                   <th>Name</th>
                   <th>Date</th>
                   <th>Unit Price</th>
                   <th>Line Total</th>
                 </tr>";

$table_body = "<tr>
                 <td>$quantity</td>
                 <td>$description</td>
                 <td>$name</td>
                 <td>$date</td>
                 <td>$$unit_price</td>
                 <td>$$line_total</td>
               </tr>";

$total = "<p>Total (Excluding GST): $$line_total</p>";

echo "<!DOCTYPE html>
      <html>
        <head>
          <title>Invoice</title>
          <link rel='stylesheet' type='text/css' href='invoice.css'>
        </head>
        <body>
          $business_info
          $invoice_info
          <table>
            $table_header
            <tbody>
              $table_body
            </tbody>
          </table>
          $total
        </body>
      </html>";
?>