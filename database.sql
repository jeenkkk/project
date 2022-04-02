DROP DATABASE IF EXISTS `Project_Phase_2`;
CREATE DATABASE `Project_Phase_2`;
USE `Project_Phase_2`;

CREATE TABLE `User_info` (
  `Firstname` varchar(20) NOT NULL,
  `Lastname` varchar(20) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `email`	varchar(100) NOT NULL UNIQUE,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`Username`)
);

CREATE TABLE `Login_info` (
  `Username` varchar(20) NOT NULL,
  `Login_log` DATETIME,
  constraint fk_username foreign key (Username) references User_info(Username),
  PRIMARY KEY (`Username`)
);
insert into `User_info` (`Firstname`,`Lastname`,`Username`,`Password`,`email`,`role`) values
('kongkiet','kuchart','jeen','1234','dog@gmail.com','admin'),
('Tony','Stark','Ironman','Loveyou3000','tony@gmail.com','user'),
('Thor','Odinson','Ragnarok','Pointbreak2012','thor@gmail.com','user');

CREATE TABLE `Product_info` (
  `Product_ID` int NOT NULL,
  `Product_Name` varchar(50) NOT NULL,
  `Product_Price` int NOT NULL,
  `Product_Quantity` int DEFAULT '1' NOT NULL,
  `Product_Description` varchar(2000) NOT NULL,
  `Product_Image` varchar(500) NOT NULL,
  `Product_Category` varchar(20) NOT NULL,
	PRIMARY KEY (`Product_ID`)
);

insert into `Product_info` (`Product_ID`,`Product_Name`,`Product_Price`,`Product_Description`,`Product_Image`,`Product_Category`) values
(1,'MEDIUM LADY D-LITE BAG',175000,'The Lady D-Lite bag combines classic elegance with House modernity. 
                        The style is fully embroidered with the Rose des Vents Toile de Jouy motif. 
                        The front features a "CHRISTIAN DIOR" signature while the thick "D.I.O.R." 
                        charms in pale gold-finish metal embellish and illuminate the silhouette. Equipped with a wide, 
                        reversible and removable embroidered shoulder strap, the medium Lady D-Lite bag can be carried by hand, 
                        worn over the shoulder or crossbody.','https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/cover_image_1/870x580/17f82f742ffe127f42dca9de82fb58b1/X/p/1633626993_M0565OTDT_M912_E01_ZHC.jpg?imwidth=870','Bag'),
(2,'COCO MADEMOISELLE',7200,'An extreme, luminous and deep concentration of patchouli infuses COCO MADEMOISELLE Eau de Parfum Intense with a voluptuous dimension. 
                        The warm, soft and feminine amber accord—an intoxicating blend of tonka bean and vanilla from Madagascar—wraps the scent in sensuality.','https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/coco-mademoiselle-eau-de-parfum-intense-spray-3-4fl-oz--packshot-default-116660-8848376889374.jpg','Perfume'),
(3,'D-LEADER ANKLE BOOT',70000,'The D-Leader ankle boot is a modern style with strong character.
                     Crafted in black calfskin with a quilted Cannage effect, it boasts a gold-tone "CHRISTIAN DIOR PARIS" signature at the back.
                     The heel and round toe are enhanced by textured rubber inserts while its sole in both leather and rubber epitomizes its contemporary look.','https://img.zolaprod.babsta.net/7Oz71spqvP1Hai6z_r6opa1KduE=/fit-in/850x850/9a2c27711d5b40098f14d720730e4c30','Shoe'),
(4,'ROUGE DIOR - NEW LOOK LIMITED EDITION',1830,'February 1947: Christian Dior dazzled the fashion world just as much as he shook it up with his 1st runway show called "New Look". 
                        Today, it is the iconic Rouge Dior lipstick is turn to experience its own "new look" by reinventing itself in an ultra-desirable limited edition.<br><br>
                        For the 1st time, the emblematic couture houndstooth motif dresses the case and the stick of the lipstick. 
                        The case of the New Look limited edition is refillable: once your lipstick is finished, 
                        replace it with the Rouge Dior refill of your choice.','https://backend.central.co.th/media/catalog/product/c/d/cds87800425-1.jpg?impolicy=resize&width=553','Lipstick'),
(5,'J12 CALIBER 12.2 EDITION 1 WATCH, 33 MM',295000,'The J12 watch features the Caliber 12.1 or Caliber 12.2*, 
                        self-winding movements manufactured exclusively for CHANEL. 
                        Allure on the inside that shows on the outside. 
                        In highly resistant ceramic, available in intense black or radiant white. 
                        An enduring, graphic and timeless watch. 
                        The J12 has been reinvented without losing its identity. 
                        For even more impact, the enhanced dial is larger, 
                        the bezel and crown more refined, 
                        and the numerals are redesigned in ceramic.','https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_1240/j12-caliber-12-2-edition-1-watch-33-mm-black-black-ceramic-steel-diamond-packshot-default-h6784-8845525843998.jpg','Watch');