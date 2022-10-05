using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Entities
{
    [Table("Classroom")]
    public class Classroom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int ClassroomId { get; set; }
        [Required]
        public string ClassroomName { get; set; }
        public virtual ICollection<Student> Students { get; set; }

    }
}