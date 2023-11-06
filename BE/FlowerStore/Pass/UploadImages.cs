//using ClothesShop.Areas.Admin.Controllers;
//using ClothesShop.Models;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Web;
//using System.Web.Hosting;

//namespace ClothesShop.Option
//{
//    public class UploadImages : ValidateController
//    {
//        public void uploadSubImage(int? id, List<HttpPostedFileBase> img)
//        {
//            foreach (var item in img)
//            {               
//                string filename = Path.GetFileNameWithoutExtension(item.FileName);
//                string extension = Path.GetExtension(item.FileName);
//                filename = filename + extension;
//                string url = "~/Image/Products/" + filename;
//                filename = Path.Combine(HostingEnvironment.MapPath("~/Image/Products/"), filename);
//                item.SaveAs(filename);
//                if( id != null)
//                {
//                    db.AddImage_Admin(id, url);
//                }
//                else
//                {
//                    var subImgs = db.GetSubImages(id).ToList();
//                    foreach (var subImg in subImgs)
//                    {
//                        db.EditImage_Admin(subImg.MaAnh, url);
//                    }
//                }
//            }
//        }
//    }
//}