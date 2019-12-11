using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using kushtar.Models;

namespace kushtar.Controllers
{
    public class KushtarsController : Controller
    {
        private readonly KushtarContext _context;

        public KushtarsController(KushtarContext context)
        {
            _context = context;
        }

        // GET: Kushtars
        public async Task<IActionResult> Index()
        {
            return View(await _context.Kushtar.ToListAsync());
        }

        // GET: Kushtars/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kushtar = await _context.Kushtar
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kushtar == null)
            {
                return NotFound();
            }

            ViewBag.Cadrs = kushtar.Cadrs;
            ViewBag.Times = kushtar.Times;

            return View(kushtar);
        }

        // GET: Kushtars/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Kushtars/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Create(Kushtar kushtar)
        {
            if (kushtar.Music == "") { kushtar.Music = "unknown"; };
            if (kushtar.Author == "") { kushtar.Author = "unknown"; };
            kushtar.Published = DateTime.Now;

            _context.Add(kushtar);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        // GET: Kushtars/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kushtar = await _context.Kushtar.FindAsync(id);
            if (kushtar == null)
            {
                return NotFound();
            }
            return View(kushtar);
        }

        // POST: Kushtars/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Music,Author,Cadrs,Times,Published")] Kushtar kushtar)
        {
            if (id != kushtar.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(kushtar);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!KushtarExists(kushtar.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(kushtar);
        }

        // GET: Kushtars/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kushtar = await _context.Kushtar
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kushtar == null)
            {
                return NotFound();
            }

            return View(kushtar);
        }

        // POST: Kushtars/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var kushtar = await _context.Kushtar.FindAsync(id);
            _context.Kushtar.Remove(kushtar);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool KushtarExists(int id)
        {
            return _context.Kushtar.Any(e => e.Id == id);
        }
    }
}
