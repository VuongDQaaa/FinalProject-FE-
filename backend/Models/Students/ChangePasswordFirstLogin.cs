using System.Text.Json.Serialization;

namespace backend.Models.Students
{
    public class ChangePasswordFirstLogin
    {
        public string UserName { get; set; }
        public string NewPassword { get; set; }
        [JsonIgnore]
        public bool IsFirstLogin { get; set; }
    }
}