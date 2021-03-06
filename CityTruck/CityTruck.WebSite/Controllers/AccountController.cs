﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using CityTruck.WebSite.Models;
using CityTruck.WebSite.Infraestructura;
using System.Configuration;
using CityTruck.Services;

namespace CityTruck.WebSite.Controllers
{
    
    public class AccountController : Controller
    {

        //
        // GET: /Account/LogOn

        public ActionResult LogOn()
        {
            return View();
        }

        //
        // POST: /Account/LogOn

        [HttpPost]
        //[]
        public ActionResult LogOn(string loginUsername, string loginPassword)
        {
            TestOracleConexion testConexion = new TestOracleConexion();
            testConexion.CadenaConexion = ConfigurationManager.ConnectionStrings["CityTruckContext"].ConnectionString;
            if (testConexion.TestConnection(loginUsername, loginPassword))
            {
                var managerUsuario = new UsuariosServices();
                var usuarios = managerUsuario.ObtenerUsuariosPorCriterio(x => x.LOGIN.ToUpper() == loginUsername.ToUpper() && x.ESTADO == "A").FirstOrDefault();
                if (usuarios != null)
                {
                    Session["connection"] = testConexion.CadenaConexion;

                    //SEG_USER seg_user = contexto.SEG_USER.Single(c => c.LASTNAME == model.UserName);
                    //Session["no"] = seg_user.NO;

                    FormsAuthentication.SetAuthCookie(loginUsername + "-" + testConexion.CadenaConexion + "-"+usuarios.ID_PERFIL +"-"+usuarios.ID_USUARIO,true);


                    DependencyResolver.SetResolver(new NinjectDependencyResolver(testConexion.CadenaConexion));

                    //FormsAuthentication.SetAuthCookie(loginUsername, true);

                    return Json(new { success = true }, JsonRequestBehavior.DenyGet);
                }
                else {
                    return Json(new { success = false , msg = "El Usuario se Encuentra Bloqueado del sistema" }, JsonRequestBehavior.DenyGet);
                }
            }
            else
            {
                return Json(new { success = false, msg = "El Nombre de Usuario o Contraseña es Incorrecto" }, JsonRequestBehavior.DenyGet);
            }



        }

        //
        // GET: /Account/LogOff

        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("Index", "Home");
        }

        //
        // GET: /Account/Register

        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register

        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Attempt to register the user
                MembershipCreateStatus createStatus;
                Membership.CreateUser(model.UserName, model.Password, model.Email, null, null, true, null, out createStatus);

                if (createStatus == MembershipCreateStatus.Success)
                {
                    FormsAuthentication.SetAuthCookie(model.UserName, false /* createPersistentCookie */);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", ErrorCodeToString(createStatus));
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ChangePassword

        [Authorize]
        public ActionResult ChangePassword()
        {
            return View();
        }

        //
        // POST: /Account/ChangePassword

        [Authorize]
        [HttpPost]
        public ActionResult ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {

                // ChangePassword will throw an exception rather
                // than return false in certain failure scenarios.
                bool changePasswordSucceeded;
                try
                {
                    MembershipUser currentUser = Membership.GetUser(User.Identity.Name, true /* userIsOnline */);
                    changePasswordSucceeded = currentUser.ChangePassword(model.OldPassword, model.NewPassword);
                }
                catch (Exception)
                {
                    changePasswordSucceeded = false;
                }

                if (changePasswordSucceeded)
                {
                    return RedirectToAction("ChangePasswordSuccess");
                }
                else
                {
                    ModelState.AddModelError("", "The current password is incorrect or the new password is invalid.");
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ChangePasswordSuccess

        public ActionResult ChangePasswordSuccess()
        {
            return View();
        }

        #region Status Codes
        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }
        #endregion
    }
}
