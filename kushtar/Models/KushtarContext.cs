using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using kushtar.Models;
using Npgsql.EntityFrameworkCore;

namespace kushtar.Models
{
    public class KushtarContext : DbContext
    {

        public KushtarContext(DbContextOptions<KushtarContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<kushtar.Models.Kushtar> Kushtar { get; set; }
    }
}
